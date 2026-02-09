import json
import os
import re
import uuid
from typing import Dict, List, Tuple

from flask import Flask, jsonify, request
from openai import OpenAI


app = Flask(__name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = (
    "You are SympAI. Answer ONLY using uploaded files. If not found, say "
    "'Information not available'. For every claim, append the source filename "
    "like [Guidelines.pdf]. Keep answers concise and clinically precise. "
    "Chat flow: perform triage-style questioning. Ask 1-2 concise, specific "
    "questions that gather clinical details (onset, duration, severity, "
    "associated symptoms, red flags). Do NOT ask the user what kind of "
    "information they want or offer generic choices. If the user indicates "
    "they are done (e.g., 'ok', 'no thanks'), do not ask follow-up questions. "
    "Avoid long lists unless "
    "explicitly requested. If enough information is gathered to generate the "
    "final case report, respond with only the token REPORT_READY."
)

# In-memory conversation store keyed by thread_id
THREADS: dict[str, List[dict[str, str]]] = {}
FILE_CACHE: Dict[str, str] = {}
END_CONFIRM: Dict[str, bool] = {}


def ensure_thread(thread_id: str | None) -> Tuple[str, List[dict[str, str]]]:
    if not thread_id:
        thread_id = str(uuid.uuid4())
    history = THREADS.setdefault(thread_id, [])
    return thread_id, history


def build_messages(history: List[dict[str, str]], user_message: str, language: str | None = None) -> List[dict[str, str]]:
    # Preserve the strict system prompt plus the running history.
    system_prompt = SYSTEM_PROMPT
    if language:
        system_prompt = f"{SYSTEM_PROMPT} Respond in {language}."
    return [{"role": "system", "content": system_prompt}, *history, {"role": "user", "content": user_message}]


def resolve_file_name(file_id: str) -> str:
    if file_id in FILE_CACHE:
        return FILE_CACHE[file_id]
    file_obj = client.files.retrieve(file_id)
    FILE_CACHE[file_id] = file_obj.filename
    return FILE_CACHE[file_id]


def apply_annotations(text_value, annotations) -> Tuple[str, List[str]]:
    """Replace annotations with readable filenames and collect sources."""
    if not annotations:
        return text_value, []

    sources: List[str] = []
    # Sort descending to avoid index shifts.
    def ann_start(a):
        if isinstance(a, dict):
            return a.get("start", 0) or 0
        return getattr(a, "start", 0) or 0

    sorted_annotations = sorted(annotations, key=ann_start, reverse=True)
    for ann in sorted_annotations:
        a_type = ann.get("type") if isinstance(ann, dict) else getattr(ann, "type", None)
        if a_type != "file_citation":
            continue
        file_citation = ann.get("file_citation") if isinstance(ann, dict) else getattr(ann, "file_citation", None)
        file_id = None
        if isinstance(file_citation, dict):
            file_id = file_citation.get("file_id")
        else:
            file_id = getattr(file_citation, "file_id", None)
        if not file_id:
            continue
        fname = resolve_file_name(file_id)
        sources.append(fname)
        start = ann.get("start", 0) if isinstance(ann, dict) else (getattr(ann, "start", 0) or 0)
        end = ann.get("end", 0) if isinstance(ann, dict) else (getattr(ann, "end", 0) or 0)
        text_value = text_value[:start] + f"[{fname}]" + text_value[end:]
    # Preserve insertion order uniqueness
    seen = set()
    deduped = []
    for s in sources[::-1]:
        if s in seen:
            continue
        seen.add(s)
        deduped.append(s)
    deduped.reverse()
    return text_value, deduped


def build_vector_store_ids() -> List[str]:
    # Accept either VECTOR_STORE_IDS or FILE_IDS (treat FILE_IDS as vector store IDs for compatibility).
    raw = os.getenv("VECTOR_STORE_IDS", "") or os.getenv("FILE_IDS", "")
    return [fid.strip() for fid in raw.split(",") if fid.strip()]


def run_assistant(messages: List[dict[str, str]], json_mode: bool = False):
    model = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")
    def to_input(msgs: List[dict[str, str]]) -> List[dict]:
        out = []
        for m in msgs:
            role = m["role"]
            content_type = "output_text" if role == "assistant" else "input_text"
            entry: Dict[str, object] = {
                "role": role,
                # Assistant messages must be "output_text"; user/system are "input_text".
                "content": [{"type": content_type, "text": m["content"]}],
            }
            out.append(entry)
        return out

    converted = to_input(messages)
    vector_store_ids = build_vector_store_ids()

    tools: List[Dict[str, object]] = [{"type": "file_search"}]
    if vector_store_ids:
        tools = [{"type": "file_search", "vector_store_ids": vector_store_ids}]

    params = {"model": model, "input": converted, "tools": tools}
    if vector_store_ids:
        # Ask the API to include file_search results so we can surface sources even
        # when the model doesn't emit explicit citations.
        params["include"] = ["file_search_call.results"]
    if json_mode:
        # Responses API uses text.format for structured outputs / JSON mode.
        params["text"] = {"format": {"type": "json_object"}}

    try:
        return client.responses.create(**params)
    except Exception as exc:
        raise RuntimeError(f"OpenAI error: {exc}") from exc


def extract_text_and_sources(response) -> Tuple[str, List[str]]:
    """Pull the first text block plus any citations, mapping to filenames."""
    if not getattr(response, "output", None):
        return "", []

    for item in response.output:
        for content in getattr(item, "content", []) or []:
            if getattr(content, "type", None) == "output_text":
                text_payload = getattr(content, "text", None)
                if not text_payload:
                    continue
                annotations = getattr(text_payload, "annotations", None) or getattr(content, "annotations", None) or []
                value = getattr(text_payload, "value", text_payload if isinstance(text_payload, str) else "")
                cleaned, sources = apply_annotations(value, annotations)
                if not sources:
                    sources = extract_sources_from_file_search(response)
                if cleaned.strip().lower() == "information not available.":
                    sources = []
                return cleaned, sources
            if getattr(content, "type", None) == "text":
                text_payload = getattr(content, "text", None)
                if not text_payload:
                    continue
                annotations = getattr(text_payload, "annotations", None) or getattr(content, "annotations", None) or []
                value = getattr(text_payload, "value", text_payload if isinstance(text_payload, str) else "")
                cleaned, sources = apply_annotations(value, annotations)
                if not sources:
                    sources = extract_sources_from_file_search(response)
                if cleaned.strip().lower() == "information not available.":
                    sources = []
                return cleaned, sources

    return "", []


def extract_sources_from_file_search(response) -> List[str]:
    sources: List[str] = []
    for item in getattr(response, "output", []) or []:
        item_type = item.get("type") if isinstance(item, dict) else getattr(item, "type", None)
        if item_type != "file_search_call":
            continue
        results = item.get("results") if isinstance(item, dict) else getattr(item, "results", None)
        for result in results or []:
            file_id = None
            if isinstance(result, dict):
                file_id = result.get("file_id") or result.get("file", {}).get("id")
            else:
                file_id = getattr(result, "file_id", None)
                if not file_id:
                    file_obj = getattr(result, "file", None)
                    file_id = getattr(file_obj, "id", None)
            if not file_id:
                continue
            sources.append(resolve_file_name(file_id))
    # De-dup while preserving order
    seen = set()
    deduped = []
    for s in sources:
        if s in seen:
            continue
        seen.add(s)
        deduped.append(s)
    return deduped


@app.route("/chat", methods=["POST"])
def chat() -> tuple:
    data = request.get_json(force=True, silent=True) or {}
    user_message = (data.get("message") or "").strip()
    language = (data.get("language") or "").strip()
    if not user_message:
        return jsonify({"error": "message is required"}), 400

    thread_id, history = ensure_thread(data.get("thread_id"))

    normalized = user_message.lower().strip()
    end_confirm = END_CONFIRM.get(thread_id, False)
    if end_confirm:
        if normalized in {"yes", "y", "ok", "okay", "sure", "please", "end", "finish", "haan", "ha", "haa", "haanji", "ji"}:
            END_CONFIRM[thread_id] = False
            user_message = "GENERATE_REPORT"
        elif normalized in {"no", "n", "not now", "continue", "nahi", "nahin"}:
            END_CONFIRM[thread_id] = False
        else:
            END_CONFIRM[thread_id] = False

    # If the user indicates they're done, trigger report flow only when the
    # last assistant turn did not ask a question.
    end_phrases = {
        "ok", "okay", "thanks", "thank you", "no thanks", "no", "done", "end", "finish",
        "no need", "not needed", "no need now", "not now",
        "thik hai", "theek hai", "thik hai thik hai", "theek hai theek hai", "bas", "nahi",
        "dhanyavaad", "dhanyavad", "shukriya", "theek"
    }
    end_patterns = [
        r"\bno\b.*\b(thanks|thank you|need|help)\b",
        r"\b(not needed|no need)\b",
        r"\b(end|finish|stop)\b.*\b(chat|conversation)\b",
        r"\bdo not need\b",
        r"\bthik\b.*\bhai\b",
        r"\btheek\b.*\bhai\b",
        r"\bshukriya\b",
        r"\bdhanyavaad\b",
        r"ठीक\s*है",
        r"धन्यवाद",
        r"शुक्रिया"
    ]
    end_intent = normalized in end_phrases or any(re.search(p, normalized) for p in end_patterns)
    if end_intent:
        last_assistant = next((m for m in reversed(history) if m.get("role") == "assistant"), None)
        last_text = (last_assistant or {}).get("content", "")
        if "?" not in last_text:
            END_CONFIRM[thread_id] = True
            confirm_msg = "Would you like me to end the conversation and generate the report?"
            if language:
                if "Hindi" in language:
                    confirm_msg = "क्या आप बातचीत समाप्त करके रिपोर्ट बनवाना चाहेंगे?"
                elif "Gujarati" in language:
                    confirm_msg = "શું તમે વાતચીત પૂરી કરીને રિપોર્ટ બનાવવો છો?"
            history.append({"role": "user", "content": user_message})
            history.append({"role": "assistant", "content": confirm_msg})
            return jsonify(
                {
                    "thread_id": thread_id,
                    "response_text": confirm_msg,
                    "sources_list": [],
                    "auto_report": False,
                    "report": None,
                }
            )

    messages = build_messages(history, user_message, language or None)

    try:
        response = run_assistant(messages)
        clean_text, sources = extract_text_and_sources(response)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500

    auto_report = False
    report_payload = None
    should_generate_report = clean_text.strip() == "REPORT_READY" or user_message == "GENERATE_REPORT"
    if should_generate_report:
        auto_report = True
        report_prompt = (
            SYSTEM_PROMPT
            + " Generate a final case report JSON strictly following the schema: "
            + '{'
            + '"severity": "Mild/Medium/Critical", '
            + '"summary": "...", '
            + '"specialist_recommended": "...", '
            + '"symptoms": [{"name": "...", "duration": "...", "description": "..."}], '
            + '"possible_conditions": [{"name": "...", "confidence": "High/Medium/Low", "description": "..."}], '
            + '"advice": ["..."], '
            + '"otc_medications": [{"name": "...", "dosage": "...", "notes": "..."}], '
            + '"sources_used": ["FileA.pdf"]'
            + '}. '
            + "Do not add extra keys. Use only evidence from provided files. "
            + (f"Write all string values in {language}. " if language else "")
            + "If data is missing, set concise placeholders explaining unavailability."
        )
        report_messages = [{"role": "system", "content": report_prompt}, *history, {"role": "user", "content": user_message}]
        try:
            report_response = run_assistant(report_messages, json_mode=True)
            text, _ = extract_text_and_sources(report_response)
            report_payload = json.loads(text or "{}")
            clean_text = "Thanks. Generating the case report now."
            sources = []
        except Exception as exc:
            return jsonify({"error": str(exc)}), 500

    history.append({"role": "user", "content": user_message})
    history.append({"role": "assistant", "content": clean_text})

    return jsonify(
        {
            "thread_id": thread_id,
            "response_text": clean_text,
            "sources_list": sources,
            "auto_report": auto_report,
            "report": report_payload,
        }
    )


@app.route("/report", methods=["POST", "GET"])
def report() -> tuple:
    payload = request.get_json(force=True, silent=True) or request.args
    thread_id = payload.get("thread_id")
    language = (payload.get("language") or "").strip()
    if not thread_id or thread_id not in THREADS:
        return jsonify({"error": "unknown or missing thread_id"}), 400

    history = THREADS[thread_id]
    report_prompt = (
        SYSTEM_PROMPT
        + " Generate a final case report JSON strictly following the schema: "
        + '{'
        + '"severity": "Mild/Medium/Critical", '
        + '"summary": "...", '
        + '"specialist_recommended": "...", '
        + '"symptoms": [{"name": "...", "duration": "...", "description": "..."}], '
        + '"possible_conditions": [{"name": "...", "confidence": "High/Medium/Low", "description": "..."}], '
        + '"advice": ["..."], '
        + '"otc_medications": [{"name": "...", "dosage": "...", "notes": "..."}], '
        + '"sources_used": ["FileA.pdf"]'
        + '}. '
        + "Do not add extra keys. Use only evidence from provided files. "
        + (f"Write all string values in {language}. " if language else "")
        + "If data is missing, set concise placeholders explaining unavailability."
    )

    messages = [{"role": "system", "content": report_prompt}, *history]

    try:
        response = run_assistant(messages, json_mode=True)
        text, _ = extract_text_and_sources(response)
        report_json = json.loads(text or "{}")
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500

    return jsonify({"thread_id": thread_id, "report": report_json})


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5001"))
    app.run(host="0.0.0.0", port=port, debug=False)
