import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./about.css";

export default function AboutPage() {
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [currentReadingId, setCurrentReadingId] = useState(null);

  useEffect(() => {
    // Check if speech synthesis is supported
    if (!("speechSynthesis" in window)) {
      setSpeechSupported(false);
      return;
    }

    // Warm up speech synthesis to avoid delay on first click
    // This is a workaround for Chrome's speech synthesis initialization delay
    const warmUp = () => {
      const utterance = new SpeechSynthesisUtterance("");
      utterance.volume = 0;
      window.speechSynthesis.speak(utterance);
    };
    
    // Warm up on page load
    warmUp();

    // Clean up speech on unmount
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleReadPage = () => {
    if (!speechSupported) {
      alert("Sorry, your browser does not support text-to-speech functionality.");
      return;
    }

    const synth = window.speechSynthesis;

    if (isSpeaking) {
      // Stop speaking
      synth.cancel();
      setIsSpeaking(false);
      setCurrentReadingId(null);
      return;
    }

    // Start speaking
    try {
      // Cancel any existing speech
      synth.cancel();

      // Define all text segments with their corresponding IDs
      const segments = [
        { id: 'title', text: 'Falls Risk Assessment Tool.' },
        { id: 'overview-heading', text: 'Project Overview.' },
        { id: 'overview-p1', text: 'Falls are one of the leading causes of unintentional injury deaths worldwide, particularly among adults aged 60 and above.' },
        { id: 'overview-p2', text: 'The Falls Risk Assessment Tool aims to support clinicians in identifying, predicting, and preventing fall-related injuries. By utilizing a predictive A I model and F H I R based clinical data, this system analyzes patient information to calculate a fall risk score and recommend preventive measures.' },
        { id: 'overview-p3', text: 'Ultimately, the tool helps create safer environments, reduce fall-related healthcare costs, and improve the quality of life for elderly patients.' },
        { id: 'features-heading', text: 'System Features.' },
        { id: 'feature-1', text: 'Patient Selection: Select and load patient data from F H I R.' },
        { id: 'feature-2', text: 'Patient Info: Display patient information, medical history and medication status.' },
        { id: 'feature-3', text: 'Risk Assessment: Two-Step Falls Risk Assessment.' },
        { id: 'feature-4', text: 'Results Dashboard: Generate risk scores and visualization charts.' },
        { id: 'feature-5', text: 'A I Care Plan: A I model automatically generates care plans.' },
        { id: 'feature-6', text: 'Report: One-click printing or export of assessment reports.' },
      ];

      let currentIndex = 0;

      const speakSegment = () => {
        if (currentIndex >= segments.length) {
          setIsSpeaking(false);
          setCurrentReadingId(null);
          return;
        }

        const segment = segments[currentIndex];
        setCurrentReadingId(segment.id);

        // Scroll to the current element
        const element = document.getElementById(segment.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        const utterance = new SpeechSynthesisUtterance(segment.text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        utterance.onend = () => {
          currentIndex++;
          speakSegment();
        };

        utterance.onerror = (event) => {
          if (event.error !== 'interrupted') {
            console.error('Speech synthesis error:', event);
          }
          setIsSpeaking(false);
          setCurrentReadingId(null);
        };

        synth.speak(utterance);
      };

      setIsSpeaking(true);
      speakSegment();

    } catch (error) {
      console.error('Error in text-to-speech:', error);
      setIsSpeaking(false);
      setCurrentReadingId(null);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
  <div className="about-page">
    <Navbar />

    {/* ✅ 这个容器一定要包住下面所有 section */}
    <div className="about-container">

      <div className="about-header">
        <h1
          id="title"
          className={currentReadingId === "title" ? "reading-highlight" : ""}
        >
          Falls Risk Assessment Tool (FRAT)
        </h1>

        <div className="about-controls">
          <button
            className={`icon-btn ${isSpeaking ? "speaking" : ""}`}
            onClick={handleReadPage}
            aria-label={isSpeaking ? "Stop reading page" : "Read page aloud"}
          >
            <span role="img" aria-hidden="true">
              {isSpeaking ? "🔇" : "🔊"}
            </span>
            {isSpeaking ? "Stop Reading" : "Read Page"}
          </button>

          <button
            className="icon-btn secondary"
            onClick={handleBackToHome}
            aria-label="Return to home page"
          >
            <span role="img" aria-hidden="true">🏠</span>
            Back to Home
          </button>
        </div>
      </div>


        {/* Project Overview */}
        <section className="about-section" aria-labelledby="overview-heading">
          <h2 
            id="overview-heading" 
            className={currentReadingId === 'overview-heading' ? 'reading-highlight' : ''}
          >
            Project Overview
          </h2>
          <p 
            id="overview-p1" 
            className={currentReadingId === 'overview-p1' ? 'reading-highlight' : ''}
          >
            Falls are one of the leading causes of unintentional injury deaths worldwide, 
            particularly among adults aged 60 and above.
          </p>
          <p 
            id="overview-p2" 
            className={currentReadingId === 'overview-p2' ? 'reading-highlight' : ''}
          >
            The Falls Risk Assessment Tool (FRAT) aims to support clinicians in identifying, 
            predicting, and preventing fall-related injuries. By utilizing a predictive AI model 
            and FHIR-based clinical data, this system analyzes patient information to calculate 
            a fall risk score and recommend preventive measures.
          </p>
          <p 
            id="overview-p3" 
            className={currentReadingId === 'overview-p3' ? 'reading-highlight' : ''}
          >
            Ultimately, the tool helps create safer environments, reduce fall-related healthcare 
            costs, and improve the quality of life for elderly patients.
          </p>
        </section>

        {/* System Features */}
        <section className="about-section" aria-labelledby="features-heading">
          <h2 
            id="features-heading" 
            className={currentReadingId === 'features-heading' ? 'reading-highlight' : ''}
          >
            System Features
          </h2>
          <ul>
            <li 
              id="feature-1" 
              className={currentReadingId === 'feature-1' ? 'reading-highlight' : ''}
            >
              <strong>🔍 Patient Selection</strong>
              Select and load patient data from FHIR.
            </li>
            <li 
              id="feature-2" 
              className={currentReadingId === 'feature-2' ? 'reading-highlight' : ''}
            >
              <strong>📋 Patient Info</strong>
              Display patient information, medical history and medication status.
            </li>
            <li 
              id="feature-3" 
              className={currentReadingId === 'feature-3' ? 'reading-highlight' : ''}
            >
              <strong>⚕️ Risk Assessment</strong>
              Two-Step Falls Risk Assessment (FRAT Part 1 & 2).
            </li>
            <li 
              id="feature-4" 
              className={currentReadingId === 'feature-4' ? 'reading-highlight' : ''}
            >
              <strong>📊 Results Dashboard</strong>
              Generate risk scores and visualization charts.
            </li>
            <li 
              id="feature-5" 
              className={currentReadingId === 'feature-5' ? 'reading-highlight' : ''}
            >
              <strong>🤖 AI Care Plan</strong>
              AI model automatically generates care plans.
            </li>
            <li 
              id="feature-6" 
              className={currentReadingId === 'feature-6' ? 'reading-highlight' : ''}
            >
              <strong>📄 Report</strong>
              One-click printing/export of assessment reports.
            </li>
          </ul>
        </section>

        {/* Download Section */}
        <section className="about-section download-section" aria-labelledby="download-heading">
          <h2 id="download-heading">📥 Download FRAT Resources</h2>
          <p style={{ marginBottom: '16px' }}>
            Download the official Falls Risk Assessment Tool documentation:
          </p>
          <div className="download-links">
            <a
              href="/documents/frat-tool.pdf"
              className="download-btn pdf-btn"
              download="Falls-Risk-Assessment-Tool-FRAT.pdf"
              aria-label="Download FRAT PDF document (74.26 KB)"
            >
              <span role="img" aria-hidden="true">📄</span>
              <div className="download-info">
                <span className="download-title">Falls Risk Assessment Tool (FRAT)</span>
                <span className="download-format">PDF Version (74.26 KB)</span>
              </div>
            </a>
            <a
              href="/documents/frat-tool.doc"
              className="download-btn doc-btn"
              download="Falls-Risk-Assessment-Tool-FRAT.doc"
              aria-label="Download FRAT Word document (286.5 KB)"
            >
              <span role="img" aria-hidden="true">📝</span>
              <div className="download-info">
                <span className="download-title">Falls Risk Assessment Tool (FRAT)</span>
                <span className="download-format">DOC Version (286.5 KB)</span>
              </div>
            </a>
          </div>
          <div style={{ 
            marginTop: '20px', 
            padding: '12px 16px', 
            background: '#fff9e6', 
            borderLeft: '4px solid #ffc107',
            borderRadius: '6px'
          }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text)', margin: 0 }}>
              <strong>📌 Note:</strong> Click the buttons above to download the PDF or DOC files directly. 
              The documents are sourced from the Victorian Department of Health.
            </p>
          </div>
        </section>

        {/* Team & Acknowledgement */}
        <section className="about-section" aria-labelledby="team-heading">
          <h2 id="team-heading">Team & Acknowledgement</h2>
          <div className="highlight-box">
            <p>
              This project was developed by <strong>XXXX Team</strong> for the <strong>XXXX</strong>.
            </p>
            <p>
              We acknowledge the Peninsula Health Falls Prevention Service for developing the 
              original FRAT tool in 1999, and the Victorian Department of Health for providing 
              the validated assessment framework.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="about-section disclaimer-section" aria-labelledby="disclaimer-heading">
          <h2 id="disclaimer-heading">⚠️ Disclaimer</h2>
          <p>
            <strong>This project is for educational and research purposes only.</strong>
          </p>
          <p>
            It does not replace professional clinical judgment or decision-making. 
            All clinical decisions should be made by qualified healthcare professionals 
            based on comprehensive patient assessment and current medical guidelines.
          </p>
        </section>

        {/* Reference */}
        <section className="about-section reference-section" aria-labelledby="reference-heading">
          <h2 id="reference-heading">Reference</h2>
          <p>
            <strong>Falls Risk Assessment Tool (FRAT)</strong>
          </p>
          <p>
            Victorian Department of Health. (1998). Falls Risk Assessment Tool (FRAT). 
            Retrieved from{" "}
            <a
              href="https://www.health.vic.gov.au/publications/falls-risk-assessment-tool-frat"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.health.vic.gov.au/publications/falls-risk-assessment-tool-frat
            </a>
          </p>
          <p style={{ marginTop: "12px", fontSize: "0.95rem", color: "var(--muted)" }}>
            The FRAT comprises three parts: Part 1 - falls risk status (can be used as a falls 
            risk screen), Part 2 - risk factor checklist, and Part 3 - action plan.
          </p>
        </section>
      </div>
    </div>
  );
}