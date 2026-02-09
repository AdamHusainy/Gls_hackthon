import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import './Widgets.css';

const StatsWidget = () => {
    return (
        <div className="widget-card">
            <div className="widget-header">
                <h3 className="widget-title">Interview Stats</h3>
                <FaChartLine style={{ color: '#6366f1' }} />
            </div>

            <div className="grid-cols-2">
                <div className="stat-box">
                    <p className="stat-label">Last Score</p>
                    <p className="stat-value">8/10</p>
                    <p className="stat-sub">System Design</p>
                </div>
                <div className="stat-box">
                    <p className="stat-label">Avg. Score</p>
                    <p className="stat-value">7.5</p>
                    <p className="stat-sub" style={{ color: '#9ca3af' }}>Across 5 mocks</p>
                </div>
            </div>

            <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 8px 0', fontWeight: '500' }}>Skill Proficiency</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className="skill-row">
                        <div className="skill-header">
                            <span>DSA</span>
                            <span style={{ fontWeight: 'bold' }}>75%</span>
                        </div>
                        <div className="progress-track" style={{ height: '6px' }}>
                            <div className="progress-fill" style={{ width: '75%', background: '#22c55e' }}></div>
                        </div>
                    </div>
                    <div className="skill-row">
                        <div className="skill-header">
                            <span>System Design</span>
                            <span style={{ fontWeight: 'bold' }}>40%</span>
                        </div>
                        <div className="progress-track" style={{ height: '6px' }}>
                            <div className="progress-fill" style={{ width: '40%', background: '#eab308' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsWidget;
