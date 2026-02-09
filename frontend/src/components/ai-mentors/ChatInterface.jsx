import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import api from '../../utils/api';

export default function ChatInterface({ userData, onRoadmapReady }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        // Initial AI Greeting
        const timer = setTimeout(() => {
            setMessages([
                {
                    id: 1,
                    sender: 'ai',
                    text: `Hello! I see you're a ${userData.role} interested in ${userData.techStack}. That's exciting! I can help you build a personalized learning roadmap. Shall we get started?`
                }
            ]);
        }, 500);
        return () => clearTimeout(timer);
    }, [userData]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMsg = {
            id: messages.length + 1,
            sender: 'user',
            text: inputValue
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            // Prepare history for API
            const history = messages.map(m => ({
                role: m.sender,
                message: m.text
            }));

            const res = await api.post('/ai/chat', {
                message: newUserMsg.text,
                history: history
            });

            const newAiMsg = {
                id: messages.length + 2,
                sender: 'ai',
                text: res.data.data
            };

            setMessages(prev => [...prev, newAiMsg]);

            // Check if we should trigger roadmap generation (simple keyword check for now)
            if (newUserMsg.text.toLowerCase().includes('roadmap') || newUserMsg.text.toLowerCase().includes('plan')) {
                setTimeout(() => {
                    onRoadmapReady();
                }, 2500);
            }

        } catch (err) {
            console.error("AI Chat Error", err);
            setMessages(prev => [...prev, {
                id: messages.length + 2,
                sender: 'ai',
                text: "Sorry, I'm having trouble connecting to my brain right now. Please try again."
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chat-container fade-in">
            <div className="chat-history">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}

                {isTyping && (
                    <div className="typing-indicator">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isTyping}
                />
                <button type="submit" className="send-btn" disabled={!inputValue.trim() || isTyping}>
                    <FaPaperPlane />
                </button>
            </form>
        </div>
    );
}
