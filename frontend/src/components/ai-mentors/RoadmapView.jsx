import React, { useState } from 'react';
import { FaCheck, FaTimes, FaBook, FaVideo, FaCode, FaChevronRight, FaStar, FaFire, FaBolt, FaRegSmile, FaRegMeh, FaRegFrown, FaExclamationCircle } from 'react-icons/fa';

export default function RoadmapView() {
    const [selectedNode, setSelectedNode] = useState(null);

    // Hierarchical Roadmap Data
    const roadmapData = [
        {
            id: 'html',
            title: "HTML",
            status: "completed",
            subNodes: [
                { id: 'h1', title: "Basic HTML Concepts", status: "completed" },
                { id: 'h2', title: "HTML Media", status: "completed" },
                { id: 'h3', title: "HTML Table", status: "completed" },
                { id: 'h4', title: "Form and Debugging", status: "completed" },
            ]
        },
        {
            id: 'css',
            title: "CSS",
            status: "in-progress",
            subNodes: [
                { id: 'c1', title: "Introduction and Styling Basics", status: "completed" },
                { id: 'c2', title: "Text Styling", status: "in-progress" },
                { id: 'c3', title: "Layout and Responsive Design", status: "locked", weak: true, resources: [{ title: 'Flexbox Froggy', type: 'game' }, { title: 'Grid Guide', type: 'article' }] },
            ]
        },
        {
            id: 'js',
            title: "JavaScript (JS)",
            status: "locked",
            subNodes: [
                { id: 'j1', title: "Basics of JavaScript", status: "skipped" },
                { id: 'j2', title: "Intermediate JavaScript Concepts", status: "skipped" },
                { id: 'j3', title: "Advanced JavaScript", status: "locked", weak: true, resources: [{ title: 'Async/Await Guide', type: 'video' }, { title: 'Event Loop Visualized', type: 'article' }] },
                { id: 'j4', title: "JavaScript in Web Development", status: "locked" },
            ]
        },
        {
            id: 'react',
            title: "ReactJS",
            status: "locked",
            subNodes: [
                { id: 'r1', title: "Introduction to React", status: "skipped" },
                { id: 'r2', title: "Advanced React Concepts", status: "locked" },
                { id: 'r3', title: "Modern React Practices", status: "locked" },
            ]
        }
    ];

    return (
        <div className="roadmap-wrapper fade-in">
            {/* Floating AI Avatar Header */}
            <div className="ai-floating-header">
                <div className="ai-avatar-pill">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="AI" className="ai-avatar-img" />
                    <span>Shumbul Arifa's AI</span>
                    <div className="ai-status-dot"></div>
                </div>
            </div>

            <div className="roadmap-content-grid">
                {/* LEFT COLUMN: TREE */}
                <div className="roadmap-tree-section">

                    {/* Header Card */}
                    <div className="roadmap-title-card">
                        <h2>Step 1: Develop Core Skills</h2>
                        <div className="title-card-content">
                            <span className="info-icon">💡</span>
                            <p>Why this step: These skills form the foundation for your entire career. Without them, both technical and practical demands of placements will feel out of reach.</p>
                        </div>
                    </div>

                    <div className="tree-container">
                        {roadmapData.map((mainNode, index) => (
                            <div key={mainNode.id} className="tree-branch">
                                {/* Main Node (Left) */}
                                <div className="main-node-wrapper">
                                    <div className={`main-node ${mainNode.status}`}>
                                        {mainNode.title}
                                    </div>
                                </div>

                                {/* Connector Lines */}
                                <div className="branch-connector">
                                    <svg width="100" height="100%" preserveAspectRatio="none">
                                        <path d="M0,50 C50,50 50,50 100,20" className="connector-path" />
                                        {/* Simplified visual connector logic needed via CSS/SVG for perfect curves */}
                                    </svg>
                                </div>

                                {/* Sub Nodes (Right) */}
                                <div className="sub-nodes-list">
                                    {mainNode.subNodes.map((sub, sIdx) => (
                                        <div key={sub.id} className="sub-node-item">
                                            <div className={`sub-node ${sub.status}`} onClick={() => setSelectedNode(sub)}>
                                                <div className="status-indicator">
                                                    {sub.status === 'completed' && <div className="dot completed" />}
                                                    {sub.status === 'in-progress' && <div className="dot in-progress" />}
                                                    {sub.status === 'locked' && <div className="dot locked" />}
                                                    {sub.status === 'skipped' && <div className="dot skipped" />}
                                                </div>
                                                <span>{sub.title}</span>
                                                {sub.weak && <FaExclamationCircle style={{ color: '#ef4444', marginLeft: 'auto' }} title="Weak Area - Needs Focus" />}
                                                {sub.status === 'skipped' && <span className="skipped-label">Skipped by AI</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN: SIDEBAR */}
                <div className="roadmap-sidebar">

                    {/* Stats Row */}
                    <div className="stats-row">
                        <div className="stat-item"><FaFire /> 0</div>
                        <div className="stat-item"><FaBook /> 0</div>
                        <div className="stat-item"><FaBolt /> 0</div>
                    </div>

                    {/* Peek Card */}
                    <div className="sidebar-card peek-card">
                        <h3>Peek Inside Your Roadmap 🤩</h3>
                        <p>There's much more ahead!</p>
                        <button className="primary-glow-btn">Explore this Roadmap</button>
                    </div>

                    {/* Feedback Card */}
                    <div className="sidebar-card feedback-card">
                        <p>Before you explore the topic, how did you find your roadmap?</p>
                        <div className="emoji-rating">
                            <span>😠<br /><small>Awful</small></span>
                            <span>Bad<br /><small>Bad</small></span>
                            <span>😐<br /><small>Okay</small></span>
                            <span>🙂<br /><small>Good</small></span>
                            <span>😍<br /><small>Great</small></span>
                        </div>
                    </div>

                    {/* Skipped Topics Card */}
                    <div className="sidebar-card skipped-card">
                        <h3>» 9 Skipped topics</h3>
                        <p>You already know them or they aren't required for your target</p>
                        <div className="toggle-row">
                            <label className="switch">
                                <input type="checkbox" checked readOnly />
                                <span className="slider round"></span>
                            </label>
                            <span>Show in roadmap</span>
                        </div>
                    </div>

                    {/* Resources Card */}
                    <div className="sidebar-card resources-card">
                        {selectedNode ? (
                            <>
                                <h3>Resources for {selectedNode.title}</h3>
                                {selectedNode.resources ? (
                                    <ul style={{ paddingLeft: '20px', fontSize: '13px', marginTop: '8px' }}>
                                        {selectedNode.resources.map((res, i) => (
                                            <li key={i} style={{ marginBottom: '4px' }}>
                                                {res.type === 'video' ? '🎥' : res.type === 'article' ? '📄' : '🎮'} <a href="#" style={{ color: '#2563eb' }}>{res.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Select a specific topic to see curated resources.</p>
                                )}
                            </>
                        ) : (
                            <>
                                <h3>Learn with Resources <span className="resource-icons">🎥📄</span></h3>
                                <p>Select a topic to view curated resources.</p>
                            </>
                        )}
                    </div>

                </div>
            </div>

            {/* Feature Request Button */}
            <div className="feature-request-btn">
                <FaStar /> Feature Request
            </div>
        </div>
    );
}
