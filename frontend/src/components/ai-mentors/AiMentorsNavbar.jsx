import React from 'react';
import { FaShareAlt, FaBell, FaComments, FaCheckCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function AiMentorsNavbar({ activeTab, onTabChange }) {
    const navigate = useNavigate();

    return (
        <div className="ai-navbar">
            <div className="ai-nav-left">
                {/* User Profile / Logo could go here if needed, but per image it's just tabs centered/leftish */}
            </div>

            <div className="ai-nav-center">
                <button
                    className={`ai-nav-tab ${activeTab === 'roadmap' ? 'active' : ''}`}
                    onClick={() => onTabChange('roadmap')}
                >
                    <FaShareAlt className="tab-icon" /> Roadmap
                </button>
                <button
                    className={`ai-nav-tab ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => onTabChange('chat')}
                >
                    <FaComments className="tab-icon" /> Chat
                </button>
            </div>

            <div className="ai-nav-right">
                <button className="ai-nav-action">
                    <FaCog /> Manage Roadmap
                </button>
                <button className="ai-nav-action exit" onClick={() => navigate('/')}>
                    <FaSignOutAlt /> Exit
                </button>
            </div>
        </div>
    );
}
