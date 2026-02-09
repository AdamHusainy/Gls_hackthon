import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './Dashboard.css';
import { FaUser, FaEnvelope, FaHistory, FaServicestack, FaArrowRight, FaClock, FaCheckCircle, FaChevronRight } from 'react-icons/fa';
import { BsGrid1X2Fill } from "react-icons/bs";

export default function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('bookings');
    const [messageTab, setMessageTab] = useState('all'); // 'all' or 'unread'

    // Mock Data for Chats
    const [chats, setChats] = useState([
        {
            id: 1,
            name: "Mudassar Hakim",
            avatar: "https://randomuser.me/api/portraits/men/86.jpg",
            date: "Nov 5, 2025",
            unread: false,
            messages: [
                { id: 1, sender: 'them', text: 'How do platforms like Netflix...', time: '10:00 AM' },
                {
                    id: 2,
                    sender: 'them',
                    type: 'linkedin',
                    content: {
                        image: 'https://media.licdn.com/dms/image/v2/D5622AQG-8-2-1-/feedshare-shrink_800/feedshare-shrink_800/0/1712476562006?e=2147483647&v=beta&t=8-2-1-',
                        title: 'How Netflix recommends movies: A simple guide to Content-Based Filtering | Mudassar Ahamer Hakim',
                        desc: '# How does Netflix know what to recommend you next? No — it\'s not magic. Yes — it can be explained simply.',
                        domain: 'linkedin.com'
                    },
                    time: '10:05 AM'
                }
            ]
        },
        {
            id: 2,
            name: "Aman Kumar",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            date: "Jun 22, 2025",
            unread: true,
            messages: [
                { id: 1, sender: 'them', text: 'Hi are you joining?', time: '09:30 AM' },
                { id: 2, sender: 'me', text: 'Yes, just a moment.', time: '09:32 AM' }
            ]
        },
        {
            id: 3,
            name: "Sumitav Acharya",
            avatar: "https://randomuser.me/api/portraits/men/12.jpg",
            date: "Jun 22, 2025",
            unread: false,
            messages: [
                { id: 1, sender: 'them', text: 'Thank you for booking...', time: 'Yesterday' }
            ]
        },
        {
            id: 4,
            name: "Nikhil Losalka",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            date: "Jun 11, 2025",
            unread: false,
            messages: [
                { id: 1, sender: 'them', text: 'are u joining ?', time: 'Jun 11' }
            ]
        },
        {
            id: 5,
            name: "Chetana Bollini",
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
            date: "Jun 10, 2025",
            unread: false,
            messages: [
                { id: 1, sender: 'them', text: '📎 ibrahim_resume (9).pdf', time: 'Jun 10' }
            ]
        }
    ]);

    const [activeChatId, setActiveChatId] = useState(1);
    const [newMessage, setNewMessage] = useState('');

    const activeChat = chats.find(c => c.id === activeChatId);
    const filteredChats = messageTab === 'unread' ? chats.filter(c => c.unread) : chats;

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const updatedChats = chats.map(chat => {
            if (chat.id === activeChatId) {
                return {
                    ...chat,
                    messages: [
                        ...chat.messages,
                        { id: Date.now(), sender: 'me', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
                    ]
                };
            }
            return chat;
        });

        setChats(updatedChats);
        setNewMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const view = params.get('view');
        if (view === 'profile') {
            setCurrentView('profile');
        } else if (view === 'messages') {
            setCurrentView('messages');
        } else if (view === 'activity') {
            setCurrentView('activity');
        } else if (view === 'services') {
            setCurrentView('services');
        } else {
            setCurrentView('bookings');
        }
    }, [location.search]);

    const handleViewChange = (view) => {
        if (view === 'profile') {
            navigate('/dashboard?view=profile');
        } else if (view === 'messages') {
            navigate('/dashboard?view=messages');
        } else if (view === 'activity') {
            navigate('/dashboard?view=activity');
        } else if (view === 'services') {
            navigate('/dashboard?view=services');
        } else {
            navigate('/dashboard');
        }
    };

    // State to simulate bookings availability
    // Toggle this to test both views
    // State to simulate bookings availability
    // Toggle this to test both views
    const [bookings, setBookings] = useState([
        // {
        //     name: "Nikhil Losalka",
        //     img: "https://randomuser.me/api/portraits/men/22.jpg",
        //     company: "Apple",
        //     exp: "13+ Years of",
        //     status: "Completed",
        //     date: "Jun 11, 2025",
        //     time: "6:00 PM"
        // },
        // {
        //     name: "Sanya Gupta",
        //     img: "https://randomuser.me/api/portraits/women/44.jpg",
        //     company: "Google",
        //     exp: "8+ Years of",
        //     status: "Scheduled",
        //     date: "Jun 15, 2025",
        //     time: "7:30 PM"
        // }
    ]);

    // Determine if we have active bookings
    const hasBookings = bookings.length > 0;

    return (
        <div className="dashboard-page">
            <Navbar />

            <div className="dashboard-container">
                {/* LEFT SIDEBAR */}
                <aside className="dash-sidebar-left">
                    <div className="sidebar-menu">
                        <div className={`menu-item ${currentView === 'bookings' ? 'active' : ''}`} onClick={() => handleViewChange('bookings')}>
                            <BsGrid1X2Fill className="menu-icon" />
                            <span>Trial Bookings</span>
                        </div>
                        <div className={`menu-item ${currentView === 'messages' ? 'active' : ''}`} onClick={() => handleViewChange('messages')}>
                            <FaEnvelope className="menu-icon" />
                            <span>Messages</span>
                            <span className="badge-count">1</span>
                        </div>
                        <div className={`menu-item ${currentView === 'activity' ? 'active' : ''}`} onClick={() => handleViewChange('activity')}>
                            <FaHistory className="menu-icon" />
                            <span>Activity Feed</span>
                        </div>
                        <div className={`menu-item ${currentView === 'profile' ? 'active' : ''}`} onClick={() => handleViewChange('profile')}>
                            <FaUser className="menu-icon" />
                            <span>My Profile</span>
                            <span className="badge-status">Pending 3</span>
                        </div>
                        <div className={`menu-item ${currentView === 'services' ? 'active' : ''}`} onClick={() => handleViewChange('services')}>
                            <FaServicestack className="menu-icon" />
                            <span>Service Request</span>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="dash-main-content">
                    {currentView === 'bookings' && (
                        <>
                            <div className="dash-header">
                                <h2>Trial Bookings</h2>
                                <p>Free 1:1 sessions for you to find the perfect mentor</p>
                            </div>

                            {!hasBookings ? (
                                /* VIEW: NO BOOKINGS */
                                <div className="no-bookings-view">
                                    <div className="no-bookings-card">
                                        <div className="nb-header">
                                            <div>
                                                <h3>No Upcoming Trial Bookings</h3>
                                                <p className="nb-sub">Book one from mentors recommended for you</p>
                                            </div>
                                            <button className="view-all-btn" onClick={() => navigate('/explore')}>View All</button>
                                        </div>
                                        <p className="nb-footer-text">Trials are 100% free and a great opportunity to finalise the mentor who's meant for you.</p>
                                    </div>

                                    {/* Recommended Mentors Carousel (Simplified representation) */}
                                    <div className="recommended-section">
                                        <div className="mentor-card-mini" onClick={() => navigate('/explore')} style={{ cursor: 'pointer' }}>
                                            <div className="mc-head">
                                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Mentor" className="mc-img" />
                                                <div>
                                                    <h4>Aman Jaiswal</h4>
                                                    <p>Senior Frontend Engineer</p>
                                                    <p className="mc-company"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/DBS_Bank_logo.svg/2560px-DBS_Bank_logo.svg.png" width="16" /> DBS</p>
                                                </div>
                                                <div className="mc-rating">★ 5.0</div>
                                            </div>
                                            <button className="book-trial-btn-dark" onClick={(e) => { e.stopPropagation(); navigate('/explore'); }}>Book a FREE Trial Session</button>
                                        </div>

                                        <div className="mentor-card-mini" onClick={() => navigate('/explore')} style={{ cursor: 'pointer' }}>
                                            <div className="mc-head">
                                                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Mentor" className="mc-img" />
                                                <div>
                                                    <h4>Shubham Khanna</h4>
                                                    <p>Senior Software Engineer</p>
                                                    <p className="mc-company"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Booking.com_logo.svg" width="16" /> Booking</p>
                                                </div>
                                                <div className="mc-rating">★ 5.0</div>
                                            </div>
                                            <button className="book-trial-btn-dark" onClick={(e) => { e.stopPropagation(); navigate('/explore'); }}>Book a FREE Trial Session</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* VIEW: BOOKINGS AVAILABLE */
                                <div className="bookings-list-view">
                                    {bookings.map((booking, idx) => (
                                        <div key={idx} className="booking-card">
                                            <div className="bc-header">
                                                <div className="bc-mentor-info">
                                                    <img src={booking.img} alt={booking.name} className="bc-img" />
                                                    <div>
                                                        <h4>{booking.name} <span className="chat-badge">💬 Chat</span> <span className="profile-badge">View Profile</span></h4>
                                                        <p>{booking.company} | {booking.exp} Experience</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bc-schedule-row">
                                                <div className="bc-label">Session Schedule <span className={`status-badge ${booking.status.toLowerCase()}`}>{booking.status}</span></div>
                                                <div className="bc-time">{booking.date} | {booking.time}</div>
                                                {booking.status === 'Completed' ? (
                                                    <button className="join-btn disabled">Join</button>
                                                ) : (
                                                    <button className="join-btn">Join</button>
                                                )}
                                            </div>

                                            <div className="bc-feedback-row">
                                                <p>Are you considering long term mentorship with {booking.name}?</p>
                                                <button className="feedback-btn">Provide Feedback</button>
                                            </div>

                                            <div className="bc-plan-row">
                                                <div>
                                                    <h5>The mentor is yet to send a Mentorship Plan</h5>
                                                    <p>Your Mentor will send you a customised Mentorship Plan tailored to your needs & key areas of concern.</p>
                                                </div>
                                                <button className="request-plan-btn">Request Plan</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {currentView === 'profile' && (
                        /* VIEW: PROFILE */
                        <div className="profile-view">
                            {/* Profile Header */}
                            <div className="profile-section-header">
                                <div>
                                    <h2>My Profile</h2>
                                    <p>Your Profile has integral data about you, which is shared with the mentors as well. Please keep all your information updated.</p>
                                </div>
                                <button className="edit-btn">✎ Edit Profile</button>
                            </div>

                            <div className="profile-card">
                                <div className="pc-user-info">
                                    <div className="pc-avatar"></div>
                                    <div className="pc-details">
                                        <h3>Meera Acharya <span className="tag-fresher">FRESHER</span></h3>
                                        <p>📞 +916356326648 &nbsp;|&nbsp; ✉️ meeraacharya2807@gmail.com</p>
                                    </div>
                                </div>
                                <div className="pc-target-row">
                                    🎯 <strong>Target :</strong> Frontend Developer in Product Based.
                                </div>
                            </div>

                            {/* Overview */}
                            <div className="profile-section">
                                <h3>Overview</h3>
                                <p className="section-desc">Basic data about your education, profession and credentials.</p>
                                <div className="info-row">
                                    💬 <strong>Languages Spoken :</strong>
                                </div>
                            </div>

                            {/* Goals */}
                            <div className="profile-section">
                                <div className="profile-section-header">
                                    <h3>Goals & Expectations</h3>
                                    <button className="edit-btn">✎ Edit Goals</button>
                                </div>
                                <p className="section-desc">Things you would like to achieve through Long Term Mentorship</p>
                                <div className="info-row">
                                    🎯 <strong>Main Goal :</strong> In college, preparing for on/off campus placements
                                </div>
                            </div>
                        </div>
                    )}

                    {currentView === 'messages' && (
                        /* VIEW: MESSAGES */
                        <div className="messages-view-container">
                            {/* Inner Left: Chat List */}
                            <div className="chat-list-sidebar">
                                <div className="cl-header">
                                    <h3>All Messages</h3>
                                    <div className="cl-tabs">
                                        <button
                                            className={`cl-tab ${messageTab === 'all' ? 'active' : ''}`}
                                            onClick={() => setMessageTab('all')}
                                        >
                                            All chats
                                        </button>
                                        <button
                                            className={`cl-tab ${messageTab === 'unread' ? 'active' : ''}`}
                                            onClick={() => setMessageTab('unread')}
                                        >
                                            Unread
                                        </button>
                                    </div>
                                </div>
                                <div className="cl-items">
                                    {filteredChats.length > 0 ? (
                                        filteredChats.map(chat => (
                                            <div
                                                key={chat.id}
                                                className={`cl-item ${activeChatId === chat.id ? 'active' : ''}`}
                                                onClick={() => setActiveChatId(chat.id)}
                                            >
                                                <img src={chat.avatar} className="cl-avatar" alt={chat.name} />
                                                <div className="cl-info">
                                                    <div className="cl-top">
                                                        <h4>{chat.name}</h4>
                                                        <span>{chat.date}</span>
                                                    </div>
                                                    <p>{chat.messages[chat.messages.length - 1]?.text || 'Started a chat'}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="cl-empty-state">
                                            <p>Your chat history will show up here</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Inner Right: Chat Window */}
                            <div className="chat-window">
                                {activeChat ? (
                                    <>
                                        <div className="cw-header">
                                            <div className="cw-user">
                                                <img src={activeChat.avatar} className="cw-avatar" alt="User" />
                                                <h3>{activeChat.name}</h3>
                                            </div>
                                            <button className="book-free-trial-btn" onClick={() => navigate('/explore')}>Book a FREE Trial</button>
                                        </div>
                                        <div className="cw-body">
                                            <div className="msg-divider"><span>Today</span></div>

                                            {activeChat.messages.map(msg => (
                                                <div key={msg.id} className={`msg-wrapper ${msg.sender === 'me' ? 'msg-outgoing' : 'msg-incoming'}`}>
                                                    {msg.type === 'linkedin' ? (
                                                        <div className="linkedin-embed">
                                                            <div className="li-header">
                                                                <div className="li-logo">in</div>
                                                                <div className="li-meta">
                                                                    <span>not on LinkedIn</span>
                                                                    <span>{msg.content.domain}</span>
                                                                </div>
                                                            </div>
                                                            <div className="li-image-placeholder">
                                                                <div className="li-logo-big">in</div>
                                                                <span>Posted on LinkedIn</span>
                                                            </div>
                                                            <div className="li-content">
                                                                <h4>{msg.content.title}</h4>
                                                                <p>{msg.content.desc}</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="msg-bubble">
                                                            {msg.text}
                                                            <span className="msg-time">{msg.time}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="cw-input-area">
                                            <input
                                                type="text"
                                                placeholder="Say something..."
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                            />
                                            <div className="cw-actions">
                                                <button>📎</button>
                                                <button>😊</button>
                                                <button>🎤</button>
                                                <button onClick={handleSendMessage} style={{ color: '#2563eb' }}>➤</button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="cl-empty-state">
                                        <p>Select a chat to start messaging</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {currentView === 'activity' && (
                        /* VIEW: ACTIVITY FEED */
                        <div className="activity-view">
                            <div className="dash-header">
                                <h2>Activity Feed</h2>
                                <p>Track your recent interactions and updates.</p>
                            </div>
                            <div className="no-bookings-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                                    <div style={{ background: '#e0f2fe', padding: '8px', borderRadius: '50%', color: '#0284c7' }}><FaUser /></div>
                                    <div>
                                        <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Profile Updated</h4>
                                        <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>You updated your bio and skills.</p>
                                    </div>
                                    <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#94a3b8' }}>2 hours ago</span>
                                </div>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <div style={{ background: '#f0fdf4', padding: '8px', borderRadius: '50%', color: '#16a34a' }}><FaCheckCircle /></div>
                                    <div>
                                        <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Login Successful</h4>
                                        <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Logged in from Chrome on MacOS.</p>
                                    </div>
                                    <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#94a3b8' }}>5 hours ago</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentView === 'services' && (
                        /* VIEW: SERVICE REQUEST */
                        <div className="services-view">
                            <div className="dash-header">
                                <h2>Service Requests</h2>
                                <p>Raise and track your service requests here.</p>
                            </div>
                            <div className="no-bookings-card" style={{ textAlign: 'center', padding: '40px' }}>
                                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛠️</div>
                                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>No Active Service Requests</h3>
                                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>You haven't raised any service requests yet.</p>
                                <button className="book-trial-btn-dark" style={{ width: 'auto', padding: '10px 24px' }} onClick={() => navigate('/explore')}>Raise a New Request</button>
                            </div>
                        </div>
                    )}
                </main>

                {/* RIGHT SIDEBAR - Only show if NOT in messages view */}
                {currentView !== 'messages' && (
                    <aside className="dash-sidebar-right">
                        {currentView === 'bookings' ? (
                            <>
                                {/* Remaining Trials Box */}
                                <div className="trials-box icon-bg-green">
                                    <h4>Your remaining trials: 10/10</h4>
                                    <p>Explore from a list of 600+ mentors, book trials and try to find the perfect mentor for you.</p>
                                    <button className="explore-all-btn" onClick={() => navigate('/explore')}>Explore All Mentors</button>
                                </div>

                                {/* RM Help Box */}
                                <div className="rm-help-box icon-bg-purple">
                                    <h4>Planning to purchase and confused about which plan is right for you?</h4>
                                    <p>Reach out to your Relationship Manager today!</p>

                                    <div className="rm-contact-card">
                                        <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="RM" className="rm-img" />
                                        <div>
                                            <h5>Bhavya Kalra</h5>
                                            <p>+919311484346</p>
                                        </div>
                                        <div className="rm-actions">
                                            <button className="rm-icon-btn whatsapp">Questions?</button>
                                            <button className="rm-icon-btn phone">Call</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* PROFILE RIGHT SIDEBAR */
                            <div className="profile-completion-widget">
                                <div className="pc-header">
                                    <h4>Profile Completion</h4>
                                    <span>0%</span>
                                </div>
                                <div className="progress-bar-bg">
                                    <div className="progress-bar-fill" style={{ width: '0%' }}></div>
                                </div>

                                <ul className="pc-checklist">
                                    <li className="completed"><FaCheckCircle className="check-icon" /> Provide Basic Information</li>
                                    <li><FaCheckCircle className="check-icon gray" /> Tell us your Experience</li>
                                    <li><FaCheckCircle className="check-icon gray" /> Upload your resume and linkedin</li>
                                    <li><FaCheckCircle className="check-icon gray" /> Tell us your Goals and Expectations</li>
                                </ul>
                            </div>
                        )}
                    </aside>
                )}
            </div>
        </div>
    );
}
