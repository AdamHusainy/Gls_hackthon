import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import './Widgets.css';

const FeedbackWidget = ({ feedback }) => {
    if (!feedback) {
        return (
            <div className="feedback-card-gradient">
                <FaQuoteLeft style={{ position: 'absolute', top: '16px', right: '16px', color: 'white', opacity: 0.2, fontSize: '40px' }} />
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p style={{ color: 'white' }}>No feedback yet.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="feedback-card-gradient">
            <FaQuoteLeft style={{ position: 'absolute', top: '16px', right: '16px', color: 'white', opacity: 0.2, fontSize: '40px' }} />

            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>Latest Feedback</h3>
                    <p style={{ color: '#c7d2fe', fontSize: '14px', margin: '0 0 16px 0' }}>From your session</p>

                    <p style={{ fontSize: '16px', fontWeight: '500', lineHeight: '1.5', fontStyle: 'italic', opacity: 0.95 }}>
                        "{feedback.content}"
                    </p>
                </div>

                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center' }}>
                    <img
                        src={feedback.mentor?.profileImage || `https://ui-avatars.com/api/?name=${feedback.mentor?.name}&background=random`}
                        alt="Mentor"
                        style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #a5b4fc', marginRight: '12px' }}
                    />
                    <div>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>{feedback.mentor?.name || 'Mentor'}</p>
                        <p style={{ fontSize: '12px', color: '#e0e7ff', margin: 0 }}>{feedback.mentor?.mentorProfile?.currentRole || 'Senior Mentor'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackWidget;
