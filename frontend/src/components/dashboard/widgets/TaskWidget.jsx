import React from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import './Widgets.css';

const TaskWidget = () => {
    const tasks = [
        { id: 1, title: 'Complete "Advanced React" module', due: 'Today', type: 'urgent' },
        { id: 2, title: 'Submit Systems Design mock', due: 'Tomorrow', type: 'normal' },
        { id: 3, title: 'Review feedback from Alex', due: 'Feb 12', type: 'completed' },
    ];

    return (
        <div className="widget-card">
            <div className="widget-header">
                <h3 className="widget-title">Review Pending</h3>
                <span className="urgent-badge">{tasks.filter(t => t.type === 'urgent').length} Urgent</span>
            </div>

            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id} className="task-item">
                        <div className="task-checkbox">
                            {task.type === 'completed' ? <FaCheckCircle style={{ color: '#22c55e' }} /> : <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #d1d5db' }}></div>}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p className="task-title" style={{ textDecoration: task.type === 'completed' ? 'line-through' : 'none', color: task.type === 'completed' ? '#9ca3af' : '#1f2937' }}>
                                {task.title}
                            </p>
                            <p className="task-meta">
                                {task.type === 'urgent' && <FaExclamationCircle style={{ color: '#ef4444', marginRight: '4px' }} />}
                                Due: {task.due}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button style={{ width: '100%', marginTop: '16px', border: 'none', background: 'none', color: '#6b7280', fontWeight: '500', cursor: 'pointer' }}>
                View All Tasks
            </button>
        </div>
    );
};

export default TaskWidget;
