import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Loader } from 'lucide-react';

const Step6 = () => {
    const navigate = useNavigate();
    const [isPublishing, setIsPublishing] = useState(false);

    const handlePublish = () => {
        setIsPublishing(true);
        // Simulate API call
        setTimeout(() => {
            setIsPublishing(false);
            navigate('/'); // Go to Dashboard
        }, 1500);
    };

    return (
        <div className="text-center">
            <div className="mb-6 flex justify-center">
                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">You're All Set!</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Your profile is ready to be published. Once live, students will be able to book sessions with you based on your availability.
            </p>

            {/* Preview Card (Mini) */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-sm mx-auto mb-8 text-left">
                <div className="flex items-center space-x-3 mb-3">
                    <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                    <div>
                        <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>

            <div className="flex justify-between pt-6 border-t">
                <button
                    type="button"
                    onClick={() => navigate('/onboarding/step5')}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    disabled={isPublishing}
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="inline-flex items-center justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 min-w-[140px]"
                >
                    {isPublishing ? (
                        <>
                            <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                            Publishing...
                        </>
                    ) : (
                        'Publish Profile'
                    )}
                </button>
            </div>
        </div>
    );
};

export default Step6;
