import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import PatientSelectionPage from "./pages/PatientSelectionPage";
import PatientInfoPage from "./pages/PatientInfoPage";
import AssessmentPage from "./pages/AssessmentPage";
import ResultsPage from "./pages/ResultsPage";
import ErrorPage from "./pages/ErrorPage";
import CallBackPage from "./pages/CallBackPage.jsx";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";

import "./App.css"; // make sure this imports your coral theme CSS

export default function App() {
  return (
    <div className="theme-coral app-container">
      {/* Main content area that will grow */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/select-patient" element={<PatientSelectionPage />} />
          <Route path="/patient-info" element={<PatientInfoPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/callback" element={<CallBackPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/error" element={<ErrorPage />} />
          {/* 404 fallback */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>

      {/* Sticky footer - will always be at bottom */}
      <Footer />
    </div>
  );
}