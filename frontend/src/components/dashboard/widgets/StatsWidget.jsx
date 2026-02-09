import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import './Widgets.css';

const StatsWidget = ({ stats }) => {
    return (
        <div className="widget-card">
            <div className="widget-header">
                <h3 className="widget-title">Interview Stats</h3>
                <FaChartLine style={{ color: '#6366f1' }} />
            </div>

            <div className="grid-cols-2">
                <div className="stat-box">
                    <p className="stat-label">Last Score</p>
                    <p className="stat-value">{stats?.avgScore || 'N/A'}</p>
                    <p className="stat-sub">Recent Session</p>
                </div>
                <div className="stat-box">
                    <p className="stat-label">Total Sessions</p>
                    <p className="stat-value">{stats?.totalSessions || 0}</p>
                    <p className="stat-sub" style={{ color: '#9ca3af' }}>Lifetime</p>
                </div>
            </div>

            <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 8px 0', fontWeight: '500' }}>Skill Proficiency</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {stats?.skills && stats.skills.length > 0 ? (
                        stats.skills.map((skill, index) => (
                            <div key={index} className="skill-row">
                                <div className="skill-header">
                                    <span>{skill.name}</span>
                                    <span style={{ fontWeight: 'bold' }}>{skill.level}%</span>
                                </div>
                                <div className="progress-track" style={{ height: '6px' }}>
                                    <div className="progress-fill" style={{ width: `${skill.level}%`, background: skill.level > 70 ? '#22c55e' : '#eab308' }}></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ fontSize: '12px', color: '#9ca3af' }}>No skills tracked yet. Take mock interviews to build your profile.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatsWidget;
