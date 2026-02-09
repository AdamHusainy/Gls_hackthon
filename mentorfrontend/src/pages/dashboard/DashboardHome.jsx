import React from 'react';
import { Users, Calendar, DollarSign, Star, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data
const data = [
    { name: 'Mon', sessions: 2 },
    { name: 'Tue', sessions: 4 },
    { name: 'Wed', sessions: 3 },
    { name: 'Thu', sessions: 5 },
    { name: 'Fri', sessions: 4 },
    { name: 'Sat', sessions: 6 },
    { name: 'Sun', sessions: 3 },
];

const DashboardHome = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <div className="flex space-x-3">
                    <span className="text-sm text-gray-500 self-center">Last updated: Just now</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Mentees"
                    value="12"
                    icon={Users}
                    trend="+2 this month"
                    trendUp={true}
                    color="blue"
                />
                <StatCard
                    title="Upcoming Sessions"
                    value="8"
                    icon={Calendar}
                    trend="Next: Today, 4pm"
                    trendUp={true}
                    color="purple"
                />
                <StatCard
                    title="Monthly Earnings"
                    value="$1,250"
                    icon={DollarSign}
                    trend="+15% vs last month"
                    trendUp={true}
                    color="green"
                />
                <StatCard
                    title="Avg. Rating"
                    value="4.9"
                    icon={Star}
                    trend="From 45 reviews"
                    trendUp={true}
                    color="yellow"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Sessions Overview</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Bar dataKey="sessions" fill="#4F46E5" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Upcoming Sessions / Action Items */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Sessions</h3>
                    <div className="space-y-4 flex-1 overflow-y-auto pr-2" style={{ maxHeight: '300px' }}>
                        <SessionCard
                            name="Alex Morgan"
                            topic="Mock Interview: System Design"
                            time="Today, 4:00 PM"
                            img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        />
                        <SessionCard
                            name="Sarah Jones"
                            topic="Frontend Mentorship"
                            time="Tomorrow, 10:00 AM"
                            img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        />
                        <SessionCard
                            name="David Chen"
                            topic="Resume Review"
                            time="Wed, 2:00 PM"
                            img="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        />
                    </div>
                    <button className="mt-4 w-full py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-md transition-colors">
                        View All Sessions
                    </button>
                </div>
            </div>

            {/* Pending Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Actions</h3>
                <div className="space-y-3">
                    <ActionItem
                        title="Review Task: 'Design Instagram Database'"
                        mentee="Alex Morgan"
                        due="Due Today"
                        type="urgent"
                    />
                    <ActionItem
                        title="Submit Feedback for recent session"
                        mentee="Sarah Jones"
                        due="Due Yesterday"
                        type="overdue"
                    />
                    <ActionItem
                        title="Approve Reschedule Request"
                        mentee="Emily White"
                        due="Received 2 hrs ago"
                        type="normal"
                    />
                </div>
            </div>
        </div>
    );
};

// Helper Components (Internal for now)
const StatCard = ({ title, value, icon: Icon, trend, trendUp, color }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        purple: 'bg-purple-50 text-purple-600',
        green: 'bg-green-50 text-green-600',
        yellow: 'bg-yellow-50 text-yellow-600',
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {trendUp !== undefined && (
                    <span className={`text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'} flex items-center bg-gray-50 px-2 py-1 rounded-full`}>
                        {trend} <TrendingUp className="w-3 h-3 ml-1" />
                    </span>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
            </div>
        </div>
    );
};

const SessionCard = ({ name, topic, time, img }) => (
    <div className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
        <img src={img} alt={name} className="w-10 h-10 rounded-full" />
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
            <p className="text-xs text-gray-500 truncate">{topic}</p>
            <div className="flex items-center mt-1 text-xs text-indigo-600">
                <Clock className="w-3 h-3 mr-1" />
                {time}
            </div>
        </div>
        <button className="text-xs font-medium text-indigo-600 border border-indigo-200 px-3 py-1 rounded-full hover:bg-indigo-50">
            Join
        </button>
    </div>
);

const ActionItem = ({ title, mentee, due, type }) => {
    const typeStyles = {
        urgent: 'border-l-4 border-yellow-400 bg-yellow-50',
        overdue: 'border-l-4 border-red-500 bg-red-50',
        normal: 'border-l-4 border-blue-400 bg-blue-50',
    };

    return (
        <div className={`p-4 rounded-r-md ${typeStyles[type]} flex justify-between items-center`}>
            <div>
                <p className="font-medium text-gray-900">{title}</p>
                <p className="text-xs text-gray-500">Mentee: {mentee} • {due}</p>
            </div>
            <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                View
            </button>
        </div>
    );
};

export default DashboardHome;
