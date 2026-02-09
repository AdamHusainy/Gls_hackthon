import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes, FaDesktop, FaCreditCard, FaHeart, FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const isExplorePage = location.pathname === '/explore';
    const isDashboard = location.pathname === '/dashboard';

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 50) { // if scroll down
                    setShowNavbar(false);
                } else { // if scroll up
                    setShowNavbar(true);
                }

                // Track if we are at the top or not for background/border
                if (window.scrollY > 10) {
                    setScrolled(true);
                } else {
                    setScrolled(false);
                }

                setLastScrollY(window.scrollY);
            }
        };

        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/');
    };

    // Don't show navbar on some pages if needed, but requirements say show it.
    // if (location.pathname === '/ai-mentors') return null; 

    return (
        <nav className={`navbar ${showNavbar ? 'nav-visible' : 'nav-hidden'} ${scrolled ? 'nav-scrolled' : ''} ${!isExplorePage ? 'home-nav' : ''}`}>
            <div className="nav-left">
                <span className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <span className="logo-icon">ii</span> preplaced
                </span>
            </div>

            <ul className="nav-center">
                <li onClick={() => navigate('/explore')}>Explore Mentors</li>
                <li onClick={() => navigate('/ai-mentors')}>AI Mentors</li>
                <li onClick={() => window.location.href = 'http://localhost:3000'}>Mock Interview</li>
                {!user && <li>Success Stories</li>}
            </ul>

            <div className="nav-right" ref={dropdownRef}>
                {user ? (
                    <>
                        <button className="menu-btn" onClick={toggleMenu}>
                            {user.profileImage && user.profileImage !== 'no-photo.jpg' ? (
                                <img src={user.profileImage} alt="Profile" className="nav-profile-img" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                <div className="menu-circle" style={{ background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {user.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            )}
                            {/* <FaBars /> */}
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-header">
                                    <div className="user-info">
                                        <h3>{user.name}</h3>
                                        <p style={{ fontSize: '12px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                                    </div>
                                    <div className="coins-badge">
                                        <span>My Preplaced Coins:</span>
                                        <span className="coin-count">0</span>
                                    </div>
                                </div>
                                <ul className="dropdown-list">
                                    <li onClick={() => { setIsOpen(false); navigate('/dashboard'); }}><FaDesktop /> My Dashboard</li>
                                    <li onClick={() => { setIsOpen(false); navigate('/dashboard?view=profile'); }}><FaUser /> My Profile</li>
                                    <li onClick={() => { setIsOpen(false); navigate('/dashboard?view=messages'); }}><FaEnvelope /> My Messages</li>
                                    <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
                                </ul>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="auth-buttons">
                        <button className="nav-login-btn" onClick={() => navigate('/mentee-login')}>Log in</button>
                        <button className="nav-signup-btn" onClick={() => navigate('/mentee-login')}>Sign up</button>
                    </div>
                )}
            </div>
        </nav>
    );
}
