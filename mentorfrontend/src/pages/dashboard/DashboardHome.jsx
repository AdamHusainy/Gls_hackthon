import React, { useState, useEffect } from 'react';
import { Users, Calendar, DollarSign, Star, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const DashboardHome = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        mentees: 0,
        upcoming: 0,
        earnings: 0,
        rating: 0
    });
    const [sessions, setSessions] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/sessions');
                const allSessions = res.data.data;

                // Calculate Stats
                const uniqueMentees = new Set(allSessions.map(s => s.student._id)).size;
                const upcomingSessions = allSessions.filter(s => new Date(s.startTime) > new Date() && s.status === 'scheduled');
                const completedSessions = allSessions.filter(s => s.status === 'completed');
                // Mock earnings: $50 per session
                const earnings = completedSessions.length * 50;

                setStats({
                    mentees: uniqueMentees,
                    upcoming: upcomingSessions.length,
                    earnings: earnings,
                    rating: user?.mentorProfile?.rating || 5.0
                });

                setSessions(upcomingSessions.slice(0, 5)); // Show top 5 upcoming

                // Calculate Chart Data (Sessions per day)
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const sessionCounts = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };

                allSessions.forEach(s => {
                    const dayName = days[new Date(s.startTime).getDay()];
                    sessionCounts[dayName]++;
                });

                const dynamicChartData = days.map(day => ({
                    name: day,
                    sessions: sessionCounts[day]
                }));
                // Set chart data state (need to add state for it)
                setChartData(dynamicChartData);

            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchData();
    }, [user]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <div className="flex space-x-3">
                    <span className="text-sm text-gray-500 self-center">Welcome, {user?.name}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Mentees"
                    value={stats.mentees}
                    icon={Users}
                    trend="Lifetime"
                    trendUp={true}
                    color="blue"
                />
                <StatCard
                    title="Upcoming Sessions"
                    value={stats.upcoming}
                    icon={Calendar}
                    trend="Next 7 Days"
                    trendUp={true}
                    color="purple"
                />
                <StatCard
                    title="Estimated Earnings"
                    value={`$${stats.earnings}`}
                    icon={DollarSign}
                    trend="Based on completed sessions"
                    trendUp={true}
                    color="green"
                />
                <StatCard
                    title="Avg. Rating"
                    value={stats.rating}
                    icon={Star}
                    trend="From profile"
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
                            <BarChart data={chartData}>
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
                        {sessions.length > 0 ? (
                            sessions.map(session => (
                                <SessionCard
                                    key={session._id}
                                    name={session.student?.name || "Student"}
                                    topic="Mentorship Session"
                                    time={new Date(session.startTime).toLocaleString()}
                                    img={`https://ui-avatars.com/api/?name=${session.student?.name || 'Student'}&background=random`}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No upcoming sessions.</p>
                        )}
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
                        title="Complete Profile"
                        mentee="System"
                        due="Recommended"
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
