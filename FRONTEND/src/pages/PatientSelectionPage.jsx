import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { getAllPatients } from "../api/fhir";

export default function PatientSelectionPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAllPatients()
      .then((res) => {
        console.log("API Response:", res.data);
        // Handle the response structure from backend: { success: true, data: [...] }
        // Backend might return 'data' or 'patients' array
        const patientData = res.data.data || res.data.patients || res.data || [];
        console.log("Patient Data:", patientData);
        setPatients(patientData);
        setError(null);
      })
      .catch((err) => {
        console.error("Error loading patients:", err);
        console.error("Error details:", err.response?.data);
        const errorMsg = err.response?.data?.message || err.message || "Failed to load patients";
        setError(`Failed to load patients: ${errorMsg}. Is the backend running on port 5000?`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSelectPatient = (patientId) => {
    // Clear any previous assessment data when selecting a new patient
    sessionStorage.removeItem("assessmentDraft");
    sessionStorage.removeItem("lastAssessmentResult");
    
    // Store selected patient ID in sessionStorage
    sessionStorage.setItem("selectedPatientId", patientId);
    navigate("/patient-info");
  };

  return (
    <>
      <Navbar />
      {loading && <Loader message="Loading patients..." />}

      {!loading && (
        <main className="patient-selection-page">
          <div className="patient-selection-container">
            <header className="page-header">
              <h2>Select a Patient</h2>
              <p className="subtitle">Choose a patient to view information and start assessment</p>
            </header>

            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}

            {!error && patients.length === 0 && (
              <div className="no-patients">
                <p>No patients found in the system.</p>
              </div>
            )}

            {!error && patients.length > 0 && (
              <div className="patients-grid">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className="patient-card"
                    onClick={() => handleSelectPatient(patient.id)}
                  >
                    <div className="patient-card-header">
                      <h3>{patient.fullName}</h3>
                      <span className="patient-id">ID: {patient.hospitalId}</span>
                    </div>
                    <div className="patient-card-body">
                      <div className="patient-info-row">
                        <span className="label">Gender:</span>
                        <span className="value">{patient.gender || "—"}</span>
                      </div>
                      <div className="patient-info-row">
                        <span className="label">Age:</span>
                        <span className="value">{patient.age || "—"}</span>
                      </div>
                      <div className="patient-info-row">
                        <span className="label">DOB:</span>
                        <span className="value">{patient.birthDate || "—"}</span>
                      </div>
                      {patient.conditions && patient.conditions.length > 0 && (
                        <div className="patient-info-row">
                          <span className="label">Conditions:</span>
                          <span className="value">{patient.conditions.length}</span>
                        </div>
                      )}
                    </div>
                    <div className="patient-card-footer">
                      <button className="btn btn-primary btn-sm">
                        Select Patient
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="card-actions">
              <button className="btn btn-ghost" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
