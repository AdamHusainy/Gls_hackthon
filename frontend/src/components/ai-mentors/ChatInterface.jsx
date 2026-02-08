import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

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

        // Simulate AI processing
        setTimeout(() => {
            let aiResponseText = "";
            let triggerRoadmap = false;

            // Simple mock logic for demo
            if (messages.length < 2) {
                aiResponseText = "Great! I'll analyze your current skills and goals to create the best path for you. Processing your roadmap now...";
                triggerRoadmap = true;
            } else {
                aiResponseText = "I'm updating your plan based on that.";
            }

            const newAiMsg = {
                id: messages.length + 2,
                sender: 'ai',
                text: aiResponseText
            };

            setMessages(prev => [...prev, newAiMsg]);
            setIsTyping(false);

            if (triggerRoadmap) {
                setTimeout(() => {
                    onRoadmapReady();
                }, 2500); // Wait a bit so they can read the message
            }

        }, 1500);
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
