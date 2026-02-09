import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Explore from './components/explore/Explore';
import Dashboard from './components/dashboard/Dashboard';
import AiMentors from './components/ai-mentors/AiMentors';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-mentors" element={<AiMentors />} />
      </Routes>
    </div>
  );
}
export default App;