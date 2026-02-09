import React from 'react';
import { Bell, Lock, CreditCard, User, Globe } from 'lucide-react';

const Settings = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

            <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
                {/* Account Settings */}
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                        <User className="w-5 h-5 mr-2 text-gray-400" />
                        Account Information
                    </h2>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">First name</label>
                            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="John" />
                        </div>
                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Last name</label>
                            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Doe" />
                        </div>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                        <Bell className="w-5 h-5 mr-2 text-gray-400" />
                        Notifications
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="candidates" name="candidates" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="candidates" className="font-medium text-gray-700">New Session Bookings</label>
                                <p className="text-gray-500">Get notified when a student books a session with you.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="offers" name="offers" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" defaultChecked />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="offers" className="font-medium text-gray-700">Message Alerts</label>
                                <p className="text-gray-500">Get notified when a student sends you a message.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Privacy */}
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 flex items-center mb-4">
                        <Lock className="w-5 h-5 mr-2 text-gray-400" />
                        Privacy & Security
                    </h2>
                    <button className="text-indigo-600 font-medium hover:text-indigo-500 text-sm">Change Password</button>
                </div>

                <div className="px-6 py-4 bg-gray-50 text-right">
                    <button type="submit" className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
