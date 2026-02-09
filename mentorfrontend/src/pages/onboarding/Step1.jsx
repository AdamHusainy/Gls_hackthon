import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

const Step1 = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        displayName: '',
        bio: '',
        languages: []
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        console.log("Step 1 Data:", formData);
        navigate('/onboarding/step2');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Let's start with the basics</h2>

            <form onSubmit={handleNext} className="space-y-6">
                {/* Photo Upload Placeholder */}
                <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                            <Camera className="h-8 w-8 text-gray-400" />
                        </div>
                    </div>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <button type="button" className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                            Upload Photo
                        </button>
                    </label>
                </div>

                <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display Name</label>
                    <input
                        type="text"
                        name="displayName"
                        id="displayName"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g. Sarah J."
                        value={formData.displayName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Short Bio</label>
                    <textarea
                        name="bio"
                        id="bio"
                        rows={4}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Tell students about yourself..."
                        value={formData.bio}
                        onChange={handleChange}
                    />
                    <p className="mt-2 text-sm text-gray-500">Brief description for your profile card.</p>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Next: Professional Info
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step1;
