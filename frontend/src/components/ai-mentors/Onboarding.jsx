import React, { useState } from 'react';

export default function Onboarding({ onComplete }) {
    const [mode, setMode] = useState('landing'); // landing, form
    const [formData, setFormData] = useState({
        role: 'student', // student, professional
        techStack: '',
        goal: '',
        experience: '0'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onComplete(formData);
    };

    if (mode === 'landing') {
        return (
            <div className="onboarding-wrapper fade-in">
                <div className="onboarding-hero">
                    <h1>Your Personal AI Career Mentor</h1>
                    <p>
                        Get a personalized roadmap, mock interviews, and 24/7 guidance
                        tailored exactly to your skills and goals.
                    </p>
                    <button
                        className="ai-btn-primary"
                        onClick={() => setMode('form')}
                    >
                        Start Your Journey
                    </button>
                </div>

                {/* Decorative background elements can go here */}
                <div className="glow-effect" />
            </div>
        );
    }

    return (
        <div className="onboarding-wrapper fade-in">
            <h2>Tell us about yourself</h2>
            <p style={{ color: 'var(--ai-text-dim)' }}>To give you the best advice, I need some context.</p>

            <form className="user-info-form glass-panel" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>I am a...</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="student">Student / Fresher</option>
                        <option value="professional">Working Professional</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Target Tech Stack (e.g., MERN, Data Science, Java)</label>
                    <input
                        type="text"
                        name="techStack"
                        placeholder="e.g. Fullstack Development"
                        value={formData.techStack}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Current Skills</label>
                    <input
                        type="text"
                        name="skills"
                        placeholder="e.g. HTML, CSS, Basic JS"
                    // Not strictly in state for this simplified version but good to have
                    />
                </div>

                <div className="form-group">
                    <label>Experience (Years)</label>
                    <input
                        type="number"
                        name="experience"
                        min="0"
                        value={formData.experience}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="ai-btn-primary" style={{ marginTop: '1rem' }}>
                    Continue to AI Chat
                </button>
            </form>
        </div>
    );
}
