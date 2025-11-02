import axios from "axios";

const API_BASE = "http://localhost:5000";

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all patients
export function getAllPatients() {
  return api.get('/patient/list');
}

// Get specific patient by ID
export function getPatientById(patientId) {
  return api.get(`/patient/${patientId}`);
}

// Get patient info (demographics, history, meds, observations)
export function getPatientInfo(patientId) {
  const id = patientId || sessionStorage.getItem("selectedPatientId");
  if (!id) {
    return Promise.reject(new Error("No patient selected"));
  }
  return api.get(`/patient/info/${id}`);
}

// Get assessment draft (if any)
export function getAssessmentDraft() {
  // Use sessionStorage for drafts instead of API calls
  try {
    const draft = sessionStorage.getItem("assessmentDraft");
    if (draft) {
      return Promise.resolve({ data: JSON.parse(draft) });
    }
    return Promise.resolve({ data: null });
  } catch (error) {
    return Promise.resolve({ data: null });
  }
}

// Save assessment draft
export function saveAssessmentDraft(data) {
  // Save to sessionStorage instead of making API calls
  try {
    sessionStorage.setItem("assessmentDraft", JSON.stringify(data));
    return Promise.resolve({ data: { success: true } });
  } catch (error) {
    console.error("Error saving draft:", error);
    return Promise.resolve({ data: { success: false } });
  }
}

// Submit completed assessment
export function submitAssessment(data) {
  const patientId = sessionStorage.getItem("selectedPatientId");
  const assessmentData = {
    ...data,
    patientId,
    timestamp: new Date().toISOString(),
  };
  
  return api.post('/assessment/submit', assessmentData)
    .then(response => {
      // Clear draft after successful submission
      sessionStorage.removeItem("assessmentDraft");
      return response;
    })
    .catch(error => {
      console.error("Error submitting assessment:", error);
      throw error;
    });
}

// Get assessment result
export function getAssessmentResult() {
  const patientId = sessionStorage.getItem("selectedPatientId");
  return api.get('/assessment/result', {
    params: { patientId }
  })
    .catch(error => {
      console.error("Error fetching assessment result:", error);
      throw error;
    });
}

// Save assessment to patient record
export function saveAssessmentToRecord(assessmentId) {
  return api.post('/assessment/save', { assessmentId });
}

// SMART on FHIR OAuth callback (not used with JSON server)
export function smartCallback(code) {
  return Promise.resolve({ data: { success: true } });
}