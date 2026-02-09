import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Step3 = () => {
    const navigate = useNavigate();
    const [selectedSkills, setSelectedSkills] = useState([]);

    const skillOptions = [
        "Data Structures & Algo", "System Design", "Frontend Development",
        "Backend Development", "Full Stack", "AI / ML",
        "Data Science", "Cloud Computing", "DevOps",
        "Mobile Development", "Cyber Security", "Product Management"
    ];

    const toggleSkill = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleNext = (e) => {
        e.preventDefault();
        console.log("Step 3 Data:", selectedSkills);
        navigate('/onboarding/step4');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Expertise</h2>
            <p className="text-gray-600 mb-6">Select the top skills you are confident in mentoring.</p>

            <form onSubmit={handleNext}>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {skillOptions.map((skill) => (
                        <div
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={`
                                cursor-pointer p-4 rounded-lg border text-center transition-all
                                ${selectedSkills.includes(skill)
                                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                                    : 'border-gray-200 hover:border-indigo-300 text-gray-600'
                                }
                            `}
                        >
                            {skill}
                        </div>
                    ))}
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => navigate('/onboarding/step2')}
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        disabled={selectedSkills.length === 0}
                        className={`
                            inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                            ${selectedSkills.length === 0 ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                        `}
                    >
                        Next: Offerings
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step3;
