import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    Users,
    CheckSquare,
    User,
    Settings,
    DollarSign,
    LogOut
} from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { path: '/', label: 'Overview', icon: LayoutDashboard },
        { path: '/sessions', label: 'Sessions', icon: Calendar },
        { path: '/mentees', label: 'Mentees', icon: Users },
        { path: '/tasks', label: 'Tasks & Feedback', icon: CheckSquare },
        { path: '/earnings', label: 'Earnings', icon: DollarSign },
        { path: '/availability', label: 'Availability', icon: Calendar }, // Reusing Calendar icon for now
        { path: '/profile', label: 'Profile', icon: User },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-indigo-600">Mentor<span className="text-gray-900">Portal</span></h1>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors
                                    ${isActive ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' : ''}
                                `}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                <span className="font-medium">{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-200">
                <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    <LogOut className="w-5 h-5 mr-3" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
