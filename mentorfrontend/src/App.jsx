import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { OnboardingLayout, Step1, Step2, Step3, Step4, Step5, Step6 } from './pages/onboarding'; // Imported from index.js
import DashboardLayout from './layouts/DashboardLayout';
import {
  DashboardHome,
  Sessions,
  Mentees,
  Tasks,
  Profile,
  Settings,
  Availability,
  Earnings
} from './pages/dashboard'; // Imported from index.js

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Onboarding Routes */}
        <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route index element={<Navigate to="/onboarding/step1" replace />} />
          <Route path="step1" element={<Step1 />} />
          <Route path="step2" element={<Step2 />} />
          <Route path="step3" element={<Step3 />} />
          <Route path="step4" element={<Step4 />} />
          <Route path="step5" element={<Step5 />} />
          <Route path="step6" element={<Step6 />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="mentees" element={<Mentees />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="availability" element={<Availability />} />
          <Route path="earnings" element={<Earnings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
