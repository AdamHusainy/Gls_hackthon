import React from 'react';
import { FaTrophy, FaFire } from 'react-icons/fa';
import './Widgets.css';

const ProgressWidget = ({ progress = 65 }) => {
    return (
        <div className="widget-card">
            <div className="widget-header">
                <div>
                    <h3 className="widget-title">My Learning</h3>
                    <p className="widget-subtitle">Frontend Development Path</p>
                </div>
                <div className="widget-icon-box">
                    <FaTrophy />
                </div>
            </div>

            <div className="progress-section">
                <div className="progress-values">
                    <span className="progress-percent">{progress}%</span>
                    <span className="progress-label">In Progress</span>
                </div>
                <div className="progress-track">
                    <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="streak-box">
                <div className="streak-content">
                    <FaFire style={{ color: '#f97316', marginRight: '8px' }} />
                    <span>5 Day Streak!</span>
                </div>
                <button className="continue-btn">Continue &rarr;</button>
            </div>
        </div>
    );
};

export default ProgressWidget;
