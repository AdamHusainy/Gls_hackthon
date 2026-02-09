import React from 'react';
import { User, MessageCircle, MoreVertical, TrendingUp, CheckSquare } from 'lucide-react';

const Mentees = () => {
    // Mock Mentees Data
    const mentees = [
        {
            id: 1,
            name: 'Alex Morgan',
            role: 'Junior Developer',
            company: 'Startup Inc.',
            goal: 'Crack FAANG',
            progress: 65,
            nextSession: 'Today, 4:00 PM',
            img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 2,
            name: 'Sarah Jones',
            role: 'Student',
            company: 'University of Tech',
            goal: 'Frontend Mastery',
            progress: 40,
            nextSession: 'Tomorrow, 10:00 AM',
            img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        {
            id: 3,
            name: 'David Chen',
            role: 'QA Engineer',
            company: 'Tech Corp',
            goal: 'Transition to Dev',
            progress: 25,
            nextSession: 'Wed, Feb 12',
            img: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">My Mentees</h1>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    Invite New Mentee
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mentees.map((mentee) => (
                    <div key={mentee.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <img className="h-16 w-16 rounded-full border-2 border-indigo-50" src={mentee.img} alt={mentee.name} />
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900">{mentee.name}</h3>
                            <p className="text-sm text-gray-500 mb-2">{mentee.role} @ {mentee.company}</p>

                            <div className="flex items-center text-sm text-indigo-600 mb-4 bg-indigo-50 px-2 py-1 rounded w-fit">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                {mentee.goal}
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Program Progress</span>
                                    <span>{mentee.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-indigo-600 h-2 rounded-full"
                                        style={{ width: `${mentee.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Next Session</p>
                                    <p>{mentee.nextSession}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between">
                            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Message
                            </button>
                            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600">
                                <CheckSquare className="w-4 h-4 mr-2" />
                                View Plan
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mentees;
