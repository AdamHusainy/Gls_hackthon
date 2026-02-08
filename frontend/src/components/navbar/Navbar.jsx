import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { FaBars, FaTimes, FaDesktop, FaCreditCard, FaHeart, FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const isExplorePage = location.pathname === '/explore';

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

    if (location.pathname === '/ai-mentors') return null;

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
                <li>Success Stories</li>
            </ul>

            <div className="nav-right" ref={dropdownRef}>
                <button className="menu-btn" onClick={toggleMenu}>
                    <div className="menu-circle"></div>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
                {!isExplorePage && (
                    <button className="nav-btn" onClick={() => navigate('/explore')}>Find your mentor →</button>
                )}

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="dropdown-menu">
                        <div className="dropdown-header">
                            <div className="user-info">
                                <h3>Meera Acharya...</h3>
                                <p>meeraacharya2807@gmail....</p>
                            </div>
                            <div className="coins-badge">
                                <span>My Preplaced Coins:</span>
                                <span className="coin-count">0</span>
                            </div>
                        </div>
                        <ul className="dropdown-list">
                            <li><FaDesktop /> My Dashboard</li>
                            <li><FaCreditCard /> Apply Credits</li>
                            <li>
                                <div className="list-item-content">
                                    <span><FaHeart /> Shortlisted Mentors</span>
                                    <span className="badge-blue">0</span>
                                </div>
                            </li>
                            <li><FaUser /> My Profile</li>
                            <li><FaEnvelope /> My Messages</li>
                            <li><FaSignOutAlt /> Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}
