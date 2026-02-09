import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, CheckCircle, MoreHorizontal } from 'lucide-react';
import api from '../../utils/api';

const Sessions = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await api.get('/sessions');
                const mappedSessions = res.data.data.map(session => ({
                    id: session._id,
                    mentee: session.student?.name || "Student",
                    topic: "Mentorship Session", // Backend doesn't store topic yet, usage placeholder
                    time: new Date(session.startTime).toLocaleString(),
                    status: session.status, // 'scheduled', 'completed', 'cancelled'
                    img: session.student?.profileImage && session.student.profileImage !== 'no-photo.jpg' ? session.student.profileImage : `https://ui-avatars.com/api/?name=${session.student?.name || 'Student'}&background=random`
                }));
                setSessions(mappedSessions);
            } catch (err) {
                console.error("Failed to fetch sessions", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, []);

    const filteredSessions = sessions.filter(s => {
        if (activeTab === 'upcoming') return s.status === 'scheduled';
        if (activeTab === 'completed') return s.status === 'completed';
        return false;
    });

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
