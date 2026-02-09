import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Step5 = () => {
    const navigate = useNavigate();

    // Mock days - in a real app this would be a complex calendar selector
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [availability, setAvailability] = useState(
        days.reduce((acc, day) => ({ ...acc, [day]: { active: false, start: '09:00', end: '17:00' } }), {})
    );

    const toggleDay = (day) => {
        setAvailability({
            ...availability,
            [day]: { ...availability[day], active: !availability[day].active }
        });
    };

    const handleNext = (e) => {
        e.preventDefault();
        console.log("Step 5 Data:", availability);
        navigate('/onboarding/step6');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Set Your Weekly Availability</h2>
            <p className="text-gray-600 mb-6">Define your standard weekly schedule. You can override specific dates later.</p>

            <form onSubmit={handleNext}>
                <div className="space-y-4 mb-8">
                    {days.map((day) => (
                        <div key={day} className="flex items-center justify-between border-b pb-4 last:border-0">
                            <div className="flex items-center w-1/3">
                                <input
                                    type="checkbox"
                                    checked={availability[day].active}
                                    onChange={() => toggleDay(day)}
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-3"
                                />
                                <span className={`font-medium ${availability[day].active ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {day}
                                </span>
                            </div>

                            {availability[day].active ? (
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="time"
                                        defaultValue="09:00"
                                        className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <span className="text-gray-500">to</span>
                                    <input
                                        type="time"
                                        defaultValue="17:00"
                                        className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            ) : (
                                <span className="text-sm text-gray-400 italic">Unavailable</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate('/onboarding/step4')}
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Next: Review & Publish
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step5;
