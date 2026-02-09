const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateRoadmap = async (goals) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Act as a career mentor.Based on these user details:
            ${JSON.stringify(goals)}

            Generate a structured learning roadmap in JSON format.
            The format should be:
        {
            "title": "Roadmap Title",
                "nodes": [
                    {
                        "id": "node-id",
                        "title": "Main Topic Title",
                        "status": "locked",
                        "subNodes": [
                            {
                                "id": "sub-id",
                                "title": "Sub Topic Title",
                                "status": "locked",
                                "resources": [
                                    { "title": "Resource Name", "type": "video/article/game", "url": "link" }
                                ]
                            }
                        ]
                    }
                ]
        }
            Return ONLY the valid JSON data.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean text if it contains markdown code blocks
        text = text.replace(/```json | ```/g, '').trim();

        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini Error:", error);
        // Fallback or rethrow
        throw new Error("Failed to generate roadmap via AI");
    }
};

exports.chatWithMentor = async (message, history) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: history.map(h => ({
                role: h.role === 'ai' ? 'model' : 'user',
                parts: [{ text: h.message }]
            })),
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        throw new Error("Failed to chat with AI Mentor");
    }
};
