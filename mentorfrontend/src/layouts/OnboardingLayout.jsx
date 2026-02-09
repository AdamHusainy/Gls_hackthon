import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const OnboardingLayout = () => {
    const location = useLocation();
    const currentStep = parseInt(location.pathname.split('step')[1]) || 1;
    const totalSteps = 6;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Progress Bar */}
            <div className="w-full max-w-3xl mb-8">
                <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                    <span>Step {currentStep} of {totalSteps}</span>
                    <span>{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default OnboardingLayout;
