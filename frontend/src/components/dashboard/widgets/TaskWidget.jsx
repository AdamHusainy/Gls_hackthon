import React from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import './Widgets.css';

const TaskWidget = ({ tasks = [] }) => {
    return (
        <div className="widget-card">
            <div className="widget-header">
                <h3 className="widget-title">Review Pending</h3>
                <span className="urgent-badge">{tasks.length} Pending</span>
            </div>

            <div className="task-list">
                {tasks.length > 0 ? tasks.map(task => (
                    <div key={task._id} className="task-item">
                        <div className="task-checkbox">
                            <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #d1d5db' }}></div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p className="task-title" style={{ color: '#1f2937' }}>
                                {task.title}
                            </p>
                            <p className="task-meta">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                )) : <p className="text-gray-500 text-sm">No pending tasks.</p>}
            </div>

            <button style={{ width: '100%', marginTop: '16px', border: 'none', background: 'none', color: '#6b7280', fontWeight: '500', cursor: 'pointer' }}>
                View All Tasks
            </button>
        </div>
    );
};

export default TaskWidget;
