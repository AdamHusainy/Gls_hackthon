import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaApple, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './MenteeLogin.css';

const MenteeLogin = () => {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            const res = await login(formData.email, formData.password);
            if (res.success) {
                navigate('/dashboard');
            } else {
                setError(res.error);
            }
        } else {
            const res = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            if (res.success) {
                navigate('/dashboard');
            } else {
                setError(res.error);
            }
        }
    };

    return (
        <div className="mentee-login-container">
            <div className="login-wrapper">
                {/* Left Side - Login Form */}
                <div className="login-left">
                    <div className="brand-logo">
                        <span style={{ color: '#2563eb', fontWeight: '800', fontSize: '24px' }}>ii</span>
                    </div>

                    <h1 className="login-title">{isLogin ? 'Sign in to get started' : 'Create an account'}</h1>
                    <p className="login-subtitle">
                        Begin your journey to your dream job with mentors who are among the top 1% in the tech industry.
                    </p>

                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        {!isLogin && (
                            <div className="phone-input-group" style={{ marginBottom: '15px' }}>
                                <label>Full Name</label>
                                <div className="phone-input-wrapper">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        style={{ width: '100%', padding: '10px', border: 'none', outline: 'none' }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="phone-input-group" style={{ marginBottom: '15px' }}>
                            <label>Email Address</label>
                            <div className="phone-input-wrapper">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '100%', padding: '10px', border: 'none', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div className="phone-input-group" style={{ marginBottom: '20px' }}>
                            <label>Password</label>
                            <div className="phone-input-wrapper">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '100%', padding: '10px', border: 'none', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <button type="submit" className="send-otp-btn">
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <p style={{ marginTop: '15px', textAlign: 'center' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span
                            style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </span>
                    </p>
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
