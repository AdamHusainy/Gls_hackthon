import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Explore from './components/explore/Explore';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
export default App;