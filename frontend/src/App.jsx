import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Explore from './components/explore/Explore';
import AiMentors from './components/ai-mentors/AiMentors';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/ai-mentors" element={<AiMentors />} />
      </Routes>
    </div>
  );
}
export default App;