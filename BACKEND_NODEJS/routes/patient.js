const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');

// Use bundle.json from root directory
const BUNDLE_FILE = path.join(__dirname, '../../bundle.json');

// Helper function to read bundle data
const readBundleData = async () => {
  try {
    const data = await fs.readJson(BUNDLE_FILE);
    return data;
  } catch (error) {
    console.error('Error reading bundle data:', error);
    return { patients: [], assessments: [], users: [] };
  }
};

// Helper function to write bundle data
const writeBundleData = async (data) => {
  try {
    await fs.writeJson(BUNDLE_FILE, data, { spaces: 2 });
    return true;
  } catch (error) {
    console.error('Error writing bundle data:', error);
    return false;
  }
};

// Helper function to find patient by ID
const findPatientById = async (patientId) => {
  const data = await readBundleData();
  return data.patients.find(patient => patient.id == patientId);
};

// Get all patients (basic info only)
router.get('/list', async (req, res) => {
  try {
    const bundleData = await readBundleData();
    const patientsList = bundleData.patients.map(patient => ({
      id: patient.id,
      hospitalId: patient.hospitalId,
      fullName: patient.fullName,
      gender: patient.gender,
      age: patient.age,
      birthDate: patient.birthDate,
      conditions: patient.conditions || []
    }));
    
    res.json({
      success: true,
      data: patientsList,
      total: patientsList.length
    });
  } catch (error) {
    console.error('Error in /list endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve patients list',
      message: error.message
    });
  }
});

// Get patient info (works without authentication for now)
router.get('/info/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await findPatientById(patientId);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found'
      });
    }

    res.json({
      success: true,
      data: patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve patient data',
      message: error.message
    });
  }
});

// Get patient by ID (for selection)
router.get('/:id', async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await findPatientById(patientId);
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found'
      });
    }

    // Set patient in session
    req.session.patient_id = patientId;
    
    res.json({
      success: true,
      data: patient,
      message: 'Patient selected successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve patient',
      message: error.message
    });
  }
});

module.exports = router;