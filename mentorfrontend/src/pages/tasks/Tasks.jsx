import React, { useState } from 'react';
import { Plus, MoreHorizontal, CheckCircle, Clock } from 'lucide-react';

const Tasks = () => {
    // Mock Tasks Data (Kanban Style)
    const [tasks, setTasks] = useState({
        todo: [
            { id: 1, title: 'Design Database Schema for E-commerce', mentee: 'Alex Morgan', due: 'Feb 15' },
            { id: 2, title: 'Solve 5 Dynamic Programming Problems', mentee: 'Sarah Jones', due: 'Feb 14' }
        ],
        inProgress: [
            { id: 3, title: 'Build React Portfolio Header', mentee: 'David Chen', due: 'Feb 12' }
        ],
        review: [
            { id: 4, title: 'System Design: Rate Limiter', mentee: 'Alex Morgan', due: 'Feb 10', submitted: true }
        ],
        done: [
            { id: 5, title: 'Setup GitHub Repo', mentee: 'All Mentees', due: 'Feb 8' }
        ]
    });

    const Column = ({ title, items, color }) => (
        <div className="bg-gray-100 rounded-lg p-4 w-72 flex-shrink-0">
            <h3 className={`font-bold text-gray-700 mb-4 flex items-center`}>
                <span className={`w-3 h-3 rounded-full mr-2 ${color}`}></span>
                {title}
                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full ml-auto">{items.length}</span>
            </h3>
            <div className="space-y-3">
                {items.map(item => (
                    <div key={item.id} className="bg-white p-3 rounded shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{item.mentee}</span>
                            <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-800 mb-2">{item.title}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                            <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" /> {item.due}
                            </span>
                            {item.submitted && (
                                <span className="text-green-600 font-bold">Review Needed</span>
                            )}
                        </div>
                    </div>
                ))}
                <button className="w-full py-2 text-sm text-gray-500 hover:bg-gray-200 rounded border border-dashed border-gray-300 flex items-center justify-center">
                    <Plus className="w-4 h-4 mr-1" /> Add Task
                </button>
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
                    <p className="text-sm text-gray-500">Track and review mentee assignments</p>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Task
                </button>
            </div>

            {/* Kanban Board Container */}
            <div className="flex-1 overflow-x-auto pb-4">
                <div className="flex space-x-6 min-w-max">
                    <Column title="To Do" items={tasks.todo} color="bg-gray-400" />
                    <Column title="In Progress" items={tasks.inProgress} color="bg-blue-400" />
                    <Column title="Ready for Review" items={tasks.review} color="bg-yellow-400" />
                    <Column title="Completed" items={tasks.done} color="bg-green-400" />
                </div>
            </div>
        </div>
    );
};

export default Tasks;
