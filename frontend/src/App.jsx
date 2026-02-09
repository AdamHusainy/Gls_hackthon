import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Explore from './components/explore/Explore';
import Dashboard from './components/dashboard/Dashboard';
import AiMentors from './components/ai-mentors/AiMentors';
import MenteeLogin from './components/auth/MenteeLogin';
import MentorLogin from './components/auth/MentorLogin';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-mentors" element={<AiMentors />} />
        <Route path="/mentee-login" element={<MenteeLogin />} />
        <Route path="/mentor-login" element={<MentorLogin />} />
      </Routes>
    </div>
  );
}
export default App;