import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { FaUser, FaEnvelope, FaPen, FaSave, FaTimes } from 'react-icons/fa';
import './Dashboard.css'; // Reusing dashboard styles for consistency

export default function UserProfile() {
    const { user, login } = useAuth(); // login function can be used to update context if it supports it, otherwise we might need a method to refresh user
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        timeline: '',
        targetCompanies: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                role: user.studentProfile?.goals?.role || '',
                timeline: user.studentProfile?.goals?.timeline || '',
                targetCompanies: user.studentProfile?.goals?.targetCompanies?.join(', ') || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const updateData = {
                name: formData.name,
                goals: {
                    role: formData.role,
                    timeline: formData.timeline,
                    targetCompanies: formData.targetCompanies.split(',').map(c => c.trim()).filter(c => c)
                }
            };

            const res = await api.put('/auth/updatedetails', updateData);

            if (res.data.success) {
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                setIsEditing(false);
                // Ideally, we should update the global auth state here. 
                // For now, we can rely on the fact that if we navigate away and back, it might refresh, 
                // or we can manually update the stored user in localStorage which AuthContext reads?
                // Better approach: Reload window or if AuthContext provided a refreshUser method.
                // Assuming simple update for now.
                const updatedUser = { ...user, ...res.data.data };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                // Force reload to update context (quick fix without modifying AuthContext deeply)
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-view">
            {/* Profile Header */}
            <div className="profile-section-header">
                <div>
                    <h2>My Profile</h2>
                    <p>Your Profile has integral data about you, which is shared with the mentors as well. Please keep all your information updated.</p>
                </div>
                {!isEditing && (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                        <FaPen style={{ marginRight: '8px' }} /> Edit Profile
                    </button>
                )}
            </div>

            {message && (
                <div className={`message-alert ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="profile-card">
                <div className="pc-user-info">
                    <img
                        src={user?.profileImage && user.profileImage !== 'no-photo.jpg' ? user.profileImage : `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                        alt="Profile"
                        className="pc-avatar-img"
                        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div className="pc-details">
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="edit-input"
                                placeholder="Full Name"
                            />
                        ) : (
                            <h3>{user?.name} <span className="tag-fresher">{user?.role === 'user' ? 'STUDENT' : 'MENTOR'}</span></h3>
                        )}
                        <p>✉️ {user?.email}</p>
                    </div>
                </div>
                <div className="pc-target-row">
                    🎯 <strong>Target :</strong> {isEditing ? (
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="edit-input inline"
                            placeholder="e.g. Frontend Developer"
                        />
                    ) : (
                        user?.studentProfile?.goals?.role || "Not set"
                    )}
                </div>
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="profile-edit-form">
                    <div className="profile-section">
                        <h3>Goals & Expectations</h3>
                        <div className="form-group">
                            <label>Timeline</label>
                            <input
                                type="text"
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleChange}
                                placeholder="e.g. 6 months, ASAP"
                            />
                        </div>
                        <div className="form-group">
                            <label>Target Companies (comma separated)</label>
                            <input
                                type="text"
                                name="targetCompanies"
                                value={formData.targetCompanies}
                                onChange={handleChange}
                                placeholder="e.g. Google, Amazon, Startup"
                            />
                        </div>
                        <div className="form-actions">
                            <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                            <button type="submit" className="save-btn" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <>
                    {/* Overview */}
                    <div className="profile-section">
                        <h3>Details</h3>
                        <div className="info-row">
                            <strong>Timeline:</strong> {user?.studentProfile?.goals?.timeline || "Not set"}
                        </div>
                        <div className="info-row">
                            <strong>Target Companies:</strong> {user?.studentProfile?.goals?.targetCompanies?.join(', ') || "Not set"}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
