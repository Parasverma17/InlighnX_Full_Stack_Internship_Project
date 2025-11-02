import React from "react";

export default function ActionsSection({ onSelectPatient, onViewInfo, onStartAssessment }) {
  return (
    <section className="actions-cards">
      <div className="cards">
        <article className="card">
          <div className="card__icon">👤</div>
          <h3>Select Patient</h3>
          <p>Browse and select patients from your healthcare facility's patient database.</p>
          <ul className="card__list">
            <li>Secure patient authentication</li>
            <li>Complete demographics & identifiers</li>
            <li>Real-time data synchronization</li>
          </ul>
          <button className="btn" onClick={onSelectPatient}>Select Patient</button>
        </article>

        <article className="card">
          <div className="card__icon">📄</div>
          <h3>View Patient Info</h3>
          <p>Review comprehensive patient information, medical history, and previous assessments.</p>
          <ul className="card__list">
            <li>Complete medical history</li>
            <li>Previous risk assessments</li>
            <li>Easy-to-read dashboard</li>
          </ul>
          <button className="btn" onClick={onViewInfo}>View Patient Info</button>
        </article>

        <article className="card">
          <div className="card__icon">✅</div>
          <h3>Start Assessment</h3>
          <p>Complete the fall risk assessment and generate AI-powered care recommendations.</p>
          <ul className="card__list">
            <li>User-friendly assessment form</li>
            <li>Automatic risk scoring</li>
            <li>AI-generated care plans</li>
          </ul>
          <button className="btn" onClick={onStartAssessment}>Start Assessment</button>
        </article>
      </div>
    </section>
  );
}