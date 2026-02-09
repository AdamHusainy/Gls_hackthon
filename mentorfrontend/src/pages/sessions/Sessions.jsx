import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, MoreHorizontal } from 'lucide-react';

const Sessions = () => {
    const [activeTab, setActiveTab] = useState('upcoming');

    // Mock Sessions Data
    const sessions = [
        { id: 1, mentee: 'Alex Morgan', topic: 'System Design Mock Interview', time: 'Today, 4:00 PM', status: 'upcoming', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 2, mentee: 'Sarah Jones', topic: 'Frontend Portfolio Review', time: 'Tomorrow, 10:00 AM', status: 'upcoming', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 3, mentee: 'David Chen', topic: 'Resume Review', time: 'Wed, Feb 12, 2:00 PM', status: 'upcoming', img: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 4, mentee: 'Emily White', topic: 'Career Guidance', time: 'Yesterday', status: 'completed', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
        { id: 5, mentee: 'Michael Brown', topic: 'DSA: Graphs', time: 'Last Week', status: 'completed', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    ];

    const filteredSessions = sessions.filter(s => s.status === activeTab);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Sessions</h1>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    Sync Calendar
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`${activeTab === 'upcoming'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        Upcoming Sessions
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`${activeTab === 'completed'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                    >
                        Past History
                    </button>
                </nav>
            </div>

            {/* Session List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {filteredSessions.length > 0 ? (
                        filteredSessions.map((session) => (
                            <li key={session.id}>
                                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img className="h-12 w-12 rounded-full" src={session.img} alt="" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-indigo-600 truncate">
                                                    {session.mentee}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                    Mentee
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {session.topic}
                                            </p>
                                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                                <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                                <p>{session.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-3">
                                        {session.status === 'upcoming' ? (
                                            <>
                                                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                                                    Reschedule
                                                </button>
                                                <button className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                                                    Join Meeting
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                                                    View Notes
                                                </button>
                                                <button className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                                                    Give Feedback
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className="p-12 text-center text-gray-500">
                            No {activeTab} sessions found.
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Sessions;
