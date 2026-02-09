import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, DollarSign, Clock } from 'lucide-react';

const Step4 = () => {
    const navigate = useNavigate();
    const [offerings, setOfferings] = useState({
        freeTrial: true,
        sessionPrice: 50,
        longTermPlans: {
            oneMonth: true,
            threeMonths: false,
            sixMonths: false
        }
    });

    const handleChange = (e) => {
        setOfferings({ ...offerings, [e.target.name]: e.target.value });
    };

    const togglePlan = (plan) => {
        setOfferings({
            ...offerings,
            longTermPlans: {
                ...offerings.longTermPlans,
                [plan]: !offerings.longTermPlans[plan]
            }
        });
    };

    const handleNext = (e) => {
        e.preventDefault();
        console.log("Step 4 Data:", offerings);
        navigate('/onboarding/step5');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mentorship Offerings</h2>

            <form onSubmit={handleNext} className="space-y-8">
                {/* 1:1 Sessions */}
                <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                        1:1 Sessions
                    </h3>

                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="font-medium text-gray-700">Offer a Free Trial Session?</p>
                            <p className="text-sm text-gray-500">First 30 mins free for new mentees.</p>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={offerings.freeTrial}
                                onChange={(e) => setOfferings({ ...offerings, freeTrial: e.target.checked })}
                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Standard Session Price ($/hr)</label>
                        <div className="relative rounded-md shadow-sm w-32">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                type="number"
                                name="sessionPrice"
                                value={offerings.sessionPrice}
                                onChange={handleChange}
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                </div>

                {/* Long Term Plans */}
                <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-indigo-600" />
                        Long-term Mentorship
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">Select the durations you want to support:</p>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {['oneMonth', 'threeMonths', 'sixMonths'].map((plan) => (
                            <div
                                key={plan}
                                onClick={() => togglePlan(plan)}
                                className={`
                                    cursor-pointer p-4 rounded-lg border text-center transition-all flex flex-col items-center justify-center h-24
                                    ${offerings.longTermPlans[plan]
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                        : 'border-gray-200 hover:border-indigo-300 text-gray-600'
                                    }
                                `}
                            >
                                <span className="font-semibold capitalize">
                                    {plan.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                {offerings.longTermPlans[plan] && <Check className="w-4 h-4 mt-2" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate('/onboarding/step3')}
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Next: Availability
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step4;
