import React, { useState, useEffect } from 'react';
import './AiMentors.css';
import Onboarding from './Onboarding';
import ChatInterface from './ChatInterface';
import RoadmapView from './RoadmapView';
import AiMentorsNavbar from './AiMentorsNavbar';

export default function AiMentors() {
    const [step, setStep] = useState('loading'); // loading, onboarding, chat, roadmap
    const [userData, setUserData] = useState(null);
    const [activeTab, setActiveTab] = useState('roadmap'); // For navbar sync

    useEffect(() => {
        // Check if user has visited before
        const savedData = localStorage.getItem('aiMentorsUser');
        if (savedData) {
            setUserData(JSON.parse(savedData));
            // Default to Chat usually, but let's sync with Navbar
            setStep('chat');
            setActiveTab('chat');
        } else {
            setStep('onboarding');
        }
    }, []);

    // Sync step with navbar tab
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // If clicking roadmap, go to roadmap view
        if (tab === 'roadmap') setStep('roadmap');
        // If clicking chat, go to chat view
        if (tab === 'chat') setStep('chat');
    };

    const handleOnboardingComplete = (data) => {
        setUserData(data);
        localStorage.setItem('aiMentorsUser', JSON.stringify(data));
        setStep('chat');
        setActiveTab('chat');
    };

    const handleRoadmapGenerated = () => {
        setStep('roadmap');
        setActiveTab('roadmap');
    };

    return (
        <div className="ai-mentors-container">
            {step !== 'onboarding' && step !== 'loading' && (
                <AiMentorsNavbar activeTab={activeTab} onTabChange={handleTabChange} />
            )}

            {step === 'onboarding' && (
                <Onboarding onComplete={handleOnboardingComplete} />
            )}
            {step === 'chat' && (
                <ChatInterface userData={userData} onRoadmapReady={handleRoadmapGenerated} />
            )}
            {step === 'roadmap' && (
                <RoadmapView />
            )}
        </div>
    );
}
