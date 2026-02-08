import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Explore from './components/explore/Explore';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </div>
  );
}
export default App;