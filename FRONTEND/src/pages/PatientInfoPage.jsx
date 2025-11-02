import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { getPatientInfo } from "../api/frat";

export default function PatientInfoPage() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedPatientId = sessionStorage.getItem("selectedPatientId");
    
    if (!selectedPatientId) {
      navigate("/select-patient");
      return;
    }

    let isMounted = true;
    setLoading(true);
    getPatientInfo(selectedPatientId)
      .then((res) => {
        if (!isMounted) return;
        // Handle the response structure from backend: { success: true, data: {...} }
        const patientData = res.data.data || res.data;
        setPatient(patientData || null);
        setError(null);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error loading patient:", err);
        setError("Failed to load patient information");
        setPatient(null);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // Get AMTS score from observations
  const amtsObs = patient?.observations?.find(
    (obs) => obs.type === "Abbreviated Mental Test Score"
  );
  const amtsScore = amtsObs ? amtsObs.value : null;

  return (
    <>
      <Navbar />
      {loading && <Loader message="Loading patient info..." />}

      {!loading && error && (
        <main className="patient-page">
          <div className="patient-shell">
            <section className="pi-card">
              <p>{error}</p>
              <button className="btn btn-primary" onClick={() => navigate("/select-patient")}>
                Back to Patient Selection
              </button>
            </section>
          </div>
        </main>
      )}

      {!loading && !error && (
        <main className="patient-page">
          <header className="page-header">
            <h2>Patient Information</h2>
            {amtsScore !== null && (
              <span className="amts-pill" aria-label="AMTS score">
                AMTS: {amtsScore}/10
              </span>
            )}
          </header>

          {!patient ? (
            <div className="patient-shell">
              <section className="pi-card">
                Patient not found.
              </section>
            </div>
          ) : (
            <div className="patient-shell">
              {/* Two-column grid on desktop, stacks on mobile */}
              <div className="patient-grid">
                {/* Demographics */}
                <section className="pi-card" aria-labelledby="demographics">
                  <h3 id="demographics">Demographics</h3>
                  <table className="info-table" role="table">
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{patient.fullName || "—"}</td>
                      </tr>
                      <tr>
                        <td>Patient ID</td>
                        <td>{patient.id || "—"}</td>
                      </tr>
                      <tr>
                        <td>Hospital ID</td>
                        <td>{patient.hospitalId || "—"}</td>
                      </tr>
                      <tr>
                        <td>Date of Birth</td>
                        <td>{patient.birthDate || "—"}</td>
                      </tr>
                      <tr>
                        <td>Age</td>
                        <td>{patient.age || "—"}</td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{patient.gender || "—"}</td>
                      </tr>
                    </tbody>
                  </table>
                </section>

                {/* Conditions */}
                <section className="pi-card" aria-labelledby="conditions">
                  <h3 id="conditions">Medical History (Conditions)</h3>
                  <ul className="pi-list">
                    {patient.conditions && patient.conditions.length > 0 ? (
                      patient.conditions.map((cond, idx) => (
                        <li key={idx}>
                          <strong>{cond.name}</strong> ({cond.status})
                          {cond.onsetDate && <><br/><small>Onset: {cond.onsetDate}</small></>}
                          {cond.notes && <><br/><small>{cond.notes}</small></>}
                        </li>
                      ))
                    ) : (
                      <li>No recent diagnoses.</li>
                    )}
                  </ul>
                </section>

                {/* Medications */}
                <section className="pi-card" aria-labelledby="medications">
                  <h3 id="medications">Current Medications</h3>
                  <ul className="pi-list">
                    {patient.medications && patient.medications.length > 0 ? (
                      patient.medications.map((med, idx) => (
                        <li key={idx}>
                          <strong>{med.name}</strong> ({med.status})
                          {med.dateAsserted && <><br/><small>Date: {med.dateAsserted}</small></>}
                        </li>
                      ))
                    ) : (
                      <li>No current medications.</li>
                    )}
                  </ul>
                </section>

                {/* Observations */}
                <section className="pi-card" aria-labelledby="observations">
                  <h3 id="observations">Recent Observations</h3>
                  <ul className="pi-list">
                    {patient.observations && patient.observations.length > 0 ? (
                      patient.observations.map((obs, idx) => (
                        <li key={idx}>
                          <strong>{obs.type}:</strong> {obs.value}
                          {obs.interpretation && <><br/><small>{obs.interpretation}</small></>}
                          {obs.date && <><br/><small>Date: {new Date(obs.date).toLocaleDateString()}</small></>}
                        </li>
                      ))
                    ) : (
                      <li>No observations found.</li>
                    )}
                  </ul>
                </section>

                {/* Immunizations */}
                <section className="pi-card" aria-labelledby="immunizations">
                  <h3 id="immunizations">Immunizations</h3>
                  <ul className="pi-list">
                    {patient.immunizations && patient.immunizations.length > 0 ? (
                      patient.immunizations.map((imm, idx) => (
                        <li key={idx}>
                          <strong>{imm.vaccine}</strong> ({imm.status})
                          {imm.date && <><br/><small>Date: {imm.date}</small></>}
                        </li>
                      ))
                    ) : (
                      <li>No immunizations found.</li>
                    )}
                  </ul>
                </section>
              </div>

              {/* Page actions */}
             <div className="card-actions">
             <button className="btn btn-ghost" onClick={() => navigate("/select-patient")}>
            Back to Patient Selection
            </button>
            <button className="btn btn-primary" onClick={() => {
              // Clear any previous assessment draft when starting new assessment
              sessionStorage.removeItem("assessmentDraft");
              // Set a flag to indicate we're starting fresh
              sessionStorage.setItem("startingNewAssessment", "true");
              navigate("/assessment");
            }}>
            Start Assessment
            </button>
            </div>

            </div>
          )}
        </main>
      )}
    </>
  );
}
