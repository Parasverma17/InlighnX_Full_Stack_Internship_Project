// src/pages/LandingPage.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import HeroSection from "../pages/herosection";
import ActionsSection from "../pages/actionsection";
import AboutSection from "../pages/Aboutsection";
import TestimonialSection from "../pages/testimonalsection";
import ContactSection from "../pages/contactsection";

import { scrollToSection } from "../pages/scrolltosection";
import { getPatientInfo } from "../api/fhir";

const SMART_LAUNCHER_URL = "https://launch.smarthealthit.org/";
const APP_LAUNCH_URL = "http://localhost:5000/auth/launch";

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll when Navbar navigates here with state {scrollTo: 'about'|'results'|'contact'|'home'}
  // Also support a query like ?scroll=about for deep links.
  useEffect(() => {
    const stateTarget = location.state?.scrollTo;
    const queryTarget = new URLSearchParams(location.search).get("scroll");
    const target = stateTarget || queryTarget;

    if (target) {
      // Clear the state & query so back/forward doesn’t keep autoscrolling
      navigate(location.pathname, { replace: true });
      // Scroll after paint
      requestAnimationFrame(() => scrollToSection(target));
    }
  }, [location, navigate]);

  // ——— Actions ———
  const handleSelectPatient = () => navigate("/select-patient");
  const handleViewInfo = () => navigate("/patient-info");
  const handleStartAssessment = () => navigate("/assessment");

  return (
    <main className="landing-page">
      <Navbar />
      {/* HERO / INTRO */}
      <HeroSection onGetStarted={() => scrollToSection("about")} />

      {/* "Three cards" section */}
      <ActionsSection
        onSelectPatient={handleSelectPatient}
        onViewInfo={handleViewInfo}
        onStartAssessment={handleStartAssessment}
      />

      {/* Waterfall sections with ids for the navbar to target */}
      <AboutSection />
      <TestimonialSection />
      <ContactSection />
    </main>
  );
}
