// src/pages/TestimonialSection.jsx

import React from "react";
import clinician1 from "../images/assessment.jpg";
import clinician2 from "../images/info.jpg";
import clinician3 from "../images/patient.jpg";



const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson, RN",
    role: "Senior Nurse, Medical Unit",
    quote:
      "InlighnX FRAT has transformed our patient assessment workflow. The AI-generated care plans save us valuable time and provide personalized recommendations that truly help our patients.",
    img: clinician1,
    alt: "Healthcare professional at work",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Geriatric Specialist",
    quote:
      "The automated risk scoring and comprehensive dashboards make it incredibly easy to identify high-risk patients quickly. This tool has become essential in our fall prevention program.",
    img: clinician2,
    alt: "Doctor reviewing patient data",
  },
  {
    id: 3,
    name: "Lisa Martinez",
    role: "Clinical Care Coordinator",
    quote:
      "The patient data visualization and assessment tracking features are outstanding. We can now monitor trends and implement preventive measures more effectively across our facility.",
    img: clinician3,
    alt: "Care coordinator managing patient care",
  },
];

export default function TestimonialSection() {
  return (
    <section id="results" className="section testimony">
      <div className="container">
        <header className="section-header">
          <h2 className="section-title">Testimonials</h2>
          <p className="section-subtitle">
            Real stories from clinicians using InlighnX FRAT every day.
          </p>
        </header>

        {/* Stacked hero cards (desktop / tablet) */}
        <div className="testimony-stack" aria-hidden="true">
          {/* middle/top card */}
          <figure className="stack-card card-center">
            <img src={TESTIMONIALS[1].img} alt="" />
          </figure>

          {/* left/back card */}
          <figure className="stack-card card-left">
            <img src={TESTIMONIALS[0].img} alt="" />
          </figure>

          {/* right/back card */}
          <figure className="stack-card card-right">
            <img src={TESTIMONIALS[2].img} alt="" />
          </figure>
        </div>

        {/* Quotes list (always visible; on mobile this is the main focus) */}
        <div className="testimony-grid" role="list">
          {TESTIMONIALS.map((t) => (
            <article key={t.id} className="testimonial" role="listitem">
              <div className="testimonial-media">
                <img src={t.img} alt={t.alt} />
              </div>
              <div className="testimonial-body">
                <blockquote>
                  <p>"{t.quote}"</p>
                </blockquote>
              </div>
              <footer className="testimonial-footer">
                <strong className="name">{t.name}</strong>
                <span className="role">{t.role}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
