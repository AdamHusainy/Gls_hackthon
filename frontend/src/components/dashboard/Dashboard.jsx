import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import UserProfile from './UserProfile';
import './Dashboard.css';
import { FaUser, FaEnvelope, FaHistory, FaServicestack, FaArrowRight, FaClock, FaCheckCircle, FaChevronRight } from 'react-icons/fa';
import { BsGrid1X2Fill, BsSpeedometer2 } from "react-icons/bs";
import ProgressWidget from './widgets/ProgressWidget';
import TaskWidget from './widgets/TaskWidget';
import FeedbackWidget from './widgets/FeedbackWidget';
import StatsWidget from './widgets/StatsWidget';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

export default function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState('overview');
    const [messageTab, setMessageTab] = useState('all'); // 'all' or 'unread'

    // Mock Data for Chats
    const [chats, setChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [activity, setActivity] = useState([]);

    // Fetch Chats
    useEffect(() => {
        if (currentView === 'messages') {
            const fetchChats = async () => {
                try {
                    const res = await api.get('/messages/conversations');
                    // Map backend conversation format to frontend
                    const mappedChats = res.data.data.map(c => ({
                        id: c.user._id,
                        name: c.user.name,
                        avatar: c.user.profileImage && c.user.profileImage !== 'no-photo.jpg' ? c.user.profileImage : `https://ui-avatars.com/api/?name=${c.user.name}&background=random`,
                        date: new Date(c.lastMessage.createdAt).toLocaleDateString(),
                        unread: c.unreadCount > 0,
                        messages: [], // We'll fetch full messages on click
                        lastMessage: c.lastMessage.content
                    }));
                    setChats(mappedChats);
                    if (mappedChats.length > 0 && !activeChatId) {
                        setActiveChatId(mappedChats[0].id);
                    }
                } catch (err) {
                    console.error("Failed to fetch chats", err);
                }
            };
            fetchChats();
        }
    }, [currentView]);

    // Fetch Messages for Active Chat
    useEffect(() => {
        if (activeChatId) {
            const fetchMessages = async () => {
                try {
                    // This endpoint needs to be implemented or we filter client side.
                    // For now, let's fetch ALL messages and filter client side as we don't have conversation-specific endpoint yet (simplified)
                    const res = await api.get('/messages');
                    const allMessages = res.data.data;

                    const conversationMessages = allMessages.filter(m =>
                        (m.sender._id === activeChatId || m.recipient._id === activeChatId)
                    ).map(m => ({
                        id: m._id,
                        sender: m.sender._id === user._id ? 'me' : 'them',
                        text: m.content,
                        time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }));

                    setChats(prev => prev.map(c =>
                        c.id === activeChatId ? { ...c, messages: conversationMessages } : c
                    ));
                } catch (err) {
                    console.error("Failed to fetch messages", err);
                }
            };
            fetchMessages();
        }
    }, [activeChatId]);


    const handleSendMessage = async () => {
        if (!newMessage.trim() || !activeChatId) return;

        try {
            const res = await api.post('/messages', {
                recipientId: activeChatId,
                content: newMessage
            });

            const sentMsg = res.data.data;
            const formattedMsg = {
                id: sentMsg._id,
                sender: 'me',
                text: sentMsg.content,
                time: new Date(sentMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setChats(prev => prev.map(chat => {
                if (chat.id === activeChatId) {
                    return {
                        ...chat,
                        messages: [...chat.messages, formattedMsg],
                        lastMessage: newMessage
                    };
                }
                return chat;
            }));
            setNewMessage('');
        } catch (err) {
            console.error("Failed to send message", err);
        }
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
        } else if (view === 'bookings') {
            setCurrentView('bookings');
        } else {
            setCurrentView('overview');
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
        } else if (view === 'bookings') {
            navigate('/dashboard?view=bookings');
        } else {
            navigate('/dashboard');
        }
    };

    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [dashboardData, setDashboardData] = useState({
        progress: 0,
        tasks: [],
        feedback: null,
        stats: null
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await api.get('/dashboard/student');
                setDashboardData(res.data.data);
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            }
        };

        const fetchSessions = async () => {
            try {
                const res = await api.get('/sessions');
                const rawSessions = res.data.data;
                const mappedSessions = rawSessions.map(session => ({
                    name: session.mentor?.name || "Mentor",
                    img: session.mentor?.profileImage && session.mentor.profileImage !== 'no-photo.jpg' ? session.mentor.profileImage : `https://ui-avatars.com/api/?name=${session.mentor?.name || 'Mentor'}&background=random`,
                    company: session.mentor?.mentorProfile?.company || "Tech Company",
                    exp: session.mentor?.mentorProfile?.experience || "Experienced",
                    status: session.status.charAt(0).toUpperCase() + session.status.slice(1),
                    date: new Date(session.startTime).toLocaleDateString(),
                    time: new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isCompleted: session.status === 'completed',
                    rawDate: new Date(session.startTime)
                }));
                setBookings(mappedSessions);

                // Generate Activity Feed
                const activityItems = [];
                // From Sessions
                rawSessions.forEach(s => {
                    activityItems.push({
                        type: 'session',
                        title: `Session ${s.status === 'completed' ? 'Completed' : 'Scheduled'}`,
                        desc: `With ${s.mentor?.name}`,
                        time: new Date(s.startTime),
                        timestamp: new Date(s.startTime).getTime()
                    });
                });

                // Sort by date desc
                activityItems.sort((a, b) => b.timestamp - a.timestamp);
                setActivity(activityItems);

            } catch (err) {
                console.error("Failed to fetch sessions", err);
            }
        };

        if (user) {
            fetchDashboardData();
            fetchSessions();
        }
    }, [user]);

    // Determine if we have active bookings
    const hasBookings = bookings.length > 0;
    const activeChat = chats.find(c => c.id === activeChatId);
    const filteredChats = messageTab === 'unread' ? chats.filter(c => c.unread) : chats;

    return (
        <div className="dashboard-page">
            <Navbar />

            <div className="dashboard-container">
                {/* LEFT SIDEBAR */}
                <aside className="dash-sidebar-left">
                    <div className="sidebar-menu">
                        <div className={`menu-item ${currentView === 'overview' ? 'active' : ''}`} onClick={() => handleViewChange('overview')}>
                            <BsSpeedometer2 className="menu-icon" />
                            <span>Overview</span>
                        </div>
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
                    {currentView === 'overview' && (
                        <div className="overview-view">
                            <div className="dash-header">
                                <h2>Welcome back, {user?.name || 'User'}! 👋</h2>
                                <p>Here's what's happening with your mentorship journey today.</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '24px' }}>
                                <div style={{ height: '280px' }}><ProgressWidget progress={dashboardData.progress} /></div>
                                <div style={{ height: '280px' }}><StatsWidget stats={dashboardData.stats} /></div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                                <div style={{ height: '320px' }}><TaskWidget tasks={dashboardData.tasks} /></div>
                                <div style={{ height: '320px' }}><FeedbackWidget feedback={dashboardData.feedback} /></div>
                            </div>
                        </div>
                    )}

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
                        <UserProfile />
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
                                                    <p>{chat.lastMessage || 'Started a chat'}</p>
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
                                {activity.length > 0 ? (
                                    activity.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                                            <div style={{ background: item.type === 'session' ? '#e0f2fe' : '#f0fdf4', padding: '8px', borderRadius: '50%', color: item.type === 'session' ? '#0284c7' : '#16a34a' }}>
                                                {item.type === 'session' ? <FaUser /> : <FaCheckCircle />}
                                            </div>
                                            <div>
                                                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>{item.title}</h4>
                                                <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>{item.desc}</p>
                                            </div>
                                            <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#94a3b8' }}>
                                                {item.time ? item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '20px' }}>No recent activity</div>
                                )}
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
