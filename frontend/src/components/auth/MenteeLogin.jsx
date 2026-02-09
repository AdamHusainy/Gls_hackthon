import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaApple, FaChevronDown } from 'react-icons/fa';
import './MenteeLogin.css';

const MenteeLogin = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleLogin = () => {
        // Simulate login
        console.log('Logging in...');
        navigate('/dashboard');
    };

    return (
        <div className="mentee-login-container">
            <div className="login-wrapper">
                {/* Left Side - Login Form */}
                <div className="login-left">
                    <div className="brand-logo">
                        <span style={{ color: '#2563eb', fontWeight: '800', fontSize: '24px' }}>ii</span>
                    </div>

                    <h1 className="login-title">Sign in to get started</h1>
                    <p className="login-subtitle">
                        Begin your journey to your dream job with mentors who are among the top 1% in the tech industry.
                    </p>

                    <div className="social-buttons">
                        <button className="social-btn google" onClick={handleLogin}>
                            <FaGoogle className="social-icon" />
                            <div className="social-text">
                                <span className="sign-in-text">Sign in as jhon</span>
                                <span className="email-text">jhonmacrin30@gmail.com</span>
                            </div>
                            <FaGoogle className="google-logo-right" />
                        </button>

                        <button className="social-btn apple" onClick={handleLogin}>
                            <FaApple className="social-icon" />
                            <span>Continue with Apple</span>
                        </button>
                    </div>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <div className="phone-input-group">
                        <label>Phone Number (whatsapp)</label>
                        <div className="phone-input-wrapper">
                            <div className="country-selector">
                                <img src="https://flagcdn.com/w20/in.png" alt="India" width="20" />
                                <FaChevronDown className="chevron-icon" />
                            </div>
                            <span className="country-code">+91</span>
                            <input
                                type="tel"
                                placeholder=""
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className="send-otp-btn" onClick={handleLogin}>
                        Send OTP
                    </button>
                </div>

                {/* Right Side - Testimonial */}
                <div className="login-right">
                    <button className="close-btn" onClick={() => navigate('/')}>×</button>

                    <div className="testimonial-card">
                        <div className="testimonial-header">
                            <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Harshit" className="t-avatar" />
                            <div>
                                <div className="t-name-row">
                                    <h4>Harshit Gupta</h4>
                                    <button className="follow-btn">+ Follow</button>
                                </div>
                                <p className="t-role">Google | Ex-Microsoft | IIT K...</p>
                                <p className="t-time">2w • 🌍</p>
                            </div>
                        </div>

                        <div className="t-content">
                            <p>
                                <span className="highlight-green">I got offers from Google, Atlassian, LinkedIn and Airbnb</span>.
                                <br />.<br />.
                            </p>
                            <p>
                                I am thrilled and very proud to announce that my <span className="highlight-green">long term mentee Suhashini Tiwari has got job offers from Google, Atlassian, LinkedIn</span> and Airbnb.
                            </p>
                            <p>
                                I would also like to thank <span className="link-blue">Preplaced</span> for providing a platform to help mentees connect with mentors. Thanks to Preplaced.
                            </p>
                        </div>

                        <div className="t-stats">
                            <div className="reactions">
                                <span>👍 ❤️ 💡</span> 1258
                            </div>
                            <div className="comments">
                                46 comments • 5 reposts
                            </div>
                        </div>
                    </div>

                    <div className="carousel-dots">
                        <span className="dot active"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenteeLogin;
