import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Building } from 'lucide-react';

const Step2 = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentRole: '',
        company: '',
        experience: '',
        linkedin: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        console.log("Step 2 Data:", formData);
        navigate('/onboarding/step3');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Background</h2>

            <form onSubmit={handleNext} className="space-y-6">
                <div>
                    <label htmlFor="currentRole" className="block text-sm font-medium text-gray-700">Current Role</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="currentRole"
                            id="currentRole"
                            required
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                            placeholder="Senior Engineer"
                            value={formData.currentRole}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="company"
                            id="company"
                            required
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                            placeholder="Google, Amazon, etc."
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                    <input
                        type="number"
                        name="experience"
                        id="experience"
                        min="0"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="5"
                        value={formData.experience}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                    <input
                        type="url"
                        name="linkedin"
                        id="linkedin"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="https://linkedin.com/in/username"
                        value={formData.linkedin}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate('/onboarding/step1')}
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Next: Expertise
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step2;
