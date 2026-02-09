import React, { useState } from 'react';
import { Camera, MapPin, Link, Mail, Edit2 } from 'lucide-react';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: 'John Doe',
        title: 'Senior Software Engineer @ Google',
        bio: 'Passionate about helping the next generation of engineers crack FAANG interviews. 10+ years of experience in distributed systems and scalable architecture.',
        location: 'San Francisco, CA',
        email: 'john.doe@example.com',
        website: 'johndoe.dev',
        skills: ['System Design', 'Distributed Systems', 'Java', 'Go', 'React']
    });

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                {/* Cover Photo */}
                <div className="h-32 bg-indigo-600"></div>

                <div className="px-6 pb-6">
                    <div className="flex justify-between items-end -mt-12 mb-6">
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" />
                            </div>
                            <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-100 hover:bg-gray-50">
                                <Camera className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-50 flex items-center shadow-sm"
                        >
                            <Edit2 className="w-4 h-4 mr-2" />
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </button>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                        <p className="text-gray-600 font-medium">{profile.title}</p>

                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" /> {profile.location}
                            </div>
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-1" /> {profile.email}
                            </div>
                            <div className="flex items-center">
                                <Link className="w-4 h-4 mr-1" /> {profile.website}
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {profile.bio}
                            </p>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Expertise</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.map(skill => (
                                    <span key={skill} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats / Reviews Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="text-center">
                        <span className="block text-3xl font-bold text-indigo-600">45</span>
                        <span className="text-gray-500 text-sm">Sessions Completed</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="text-center">
                        <span className="block text-3xl font-bold text-indigo-600">4.9/5</span>
                        <span className="text-gray-500 text-sm">Average Rating</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="text-center">
                        <span className="block text-3xl font-bold text-indigo-600">12</span>
                        <span className="text-gray-500 text-sm">Active Mentees</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
