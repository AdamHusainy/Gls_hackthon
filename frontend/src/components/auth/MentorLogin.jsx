import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaApple, FaInfoCircle } from 'react-icons/fa';
import './MentorLogin.css';

const MentorLogin = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        domain: '',
        startYear: '',
        linkedin: '',
        isRegularPoster: null // true for Yes, false for No
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNextStep = () => {
        setStep(2);
    };

    const handleSaveDetails = () => {
        console.log('Saving mentor details:', formData);
        // Simulate save and redirect
        navigate('/dashboard');
    };

    return (
        <div className="mentor-login-container">
            <button className="sign-out-btn" onClick={() => navigate('/')}>Sign Out</button>

            <div className="mentor-card">
                <div className="brand-logo-center">
                    <span style={{ color: '#2563eb', fontWeight: '800', fontSize: '32px' }}>ii</span>
                </div>

                {step === 1 ? (
                    /* STEP 1: AUTHENTICATION */
                    <div className="step-content">
                        <h1 className="mentor-title">Join or Sign in as a Mentor</h1>
                        <p className="mentor-subtitle">
                            <span style={{ textDecoration: 'line-through', color: '#6b7280' }}>Mentorship</span>, Goal oriented Long Term Mentorship is what makes us different.
                        </p>

                        <div className="social-buttons-col">
                            <button className="social-btn-large" onClick={handleNextStep}>
                                <FaGoogle className="social-icon-color" />
                                <span>Continue with Google</span>
                            </button>
                            <button className="social-btn-large" onClick={handleNextStep}>
                                <FaApple className="social-icon-black" />
                                <span>Continue with Apple</span>
                            </button>
                        </div>

                        <div className="divider-text">OR</div>

                        <div className="form-group">
                            <label>Email<span className="required">*</span></label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="input-field"
                            />
                        </div>

                        <button className="continue-btn" onClick={handleNextStep}>
                            Continue
                        </button>

                        <p className="terms-text">
                            By continuing, you agree to the <span className="link-text">Terms of use</span>, <br />
                            <span className="link-text">Privacy</span> and <span className="link-text">Policy</span> Preplaced.
                        </p>
                    </div>
                ) : (
                    /* STEP 2: DETAILS */
                    <div className="step-content">
                        <h1 className="mentor-title">Tell us about Yourself</h1>
                        <p className="mentor-subtitle">
                            Let's setup your mentorship profile based on your professional details
                        </p>

                        <div className="form-group">
                            <label>Domain Expertise<span className="required">*</span></label>
                            <select
                                name="domain"
                                value={formData.domain}
                                onChange={handleInputChange}
                                className="input-field select-field"
                            >
                                <option value="">Select Your Domain</option>
                                <option value="frontend">Frontend Development</option>
                                <option value="backend">Backend Development</option>
                                <option value="fullstack">Full Stack Development</option>
                                <option value="datascience">Data Science</option>
                                <option value="product">Product Management</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>When did you start working?<span className="required">*</span></label>
                            <div className="input-with-icon">
                                <input
                                    type="text"
                                    name="startYear"
                                    placeholder="XXXX - Enter Year"
                                    value={formData.startYear}
                                    onChange={handleInputChange}
                                    className="input-field"
                                />
                                <FaInfoCircle className="info-icon" />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="label-row">
                                <label>Linkedin Profile<span className="required">*</span></label>
                                <span className="get-profile-link">Get Profile URL →</span>
                            </div>
                            <input
                                type="text"
                                name="linkedin"
                                placeholder="https://www.linkedin.com/in/preplaced"
                                value={formData.linkedin}
                                onChange={handleInputChange}
                                className="input-field"
                            />
                        </div>

                        <div className="form-group">
                            <label>Do you post regularly on any platform?<span className="required">*</span></label>
                            <div className="toggle-buttons">
                                <button
                                    className={`toggle-btn ${formData.isRegularPoster === true ? 'active' : ''}`}
                                    onClick={() => setFormData({ ...formData, isRegularPoster: true })}
                                >
                                    Yes, I Do
                                </button>
                                <button
                                    className={`toggle-btn ${formData.isRegularPoster === false ? 'active' : ''}`}
                                    onClick={() => setFormData({ ...formData, isRegularPoster: false })}
                                >
                                    No, I Don't
                                </button>
                            </div>
                        </div>

                        <button className="continue-btn" onClick={handleSaveDetails}>
                            Save Details
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MentorLogin;
