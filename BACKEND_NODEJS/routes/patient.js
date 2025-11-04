const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Get all patients (basic info only)
router.get('/list', async (req, res) => {
  try {
    const patients = await Patient.find({})
      .select('hospitalId fullName gender age birthDate conditions')
      .lean();

    const patientsList = patients.map(patient => ({
      id: patient._id.toString(),
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
    const patient = await Patient.findById(patientId).lean();

    if (!patient) {
      return res.status(404).json({
        success: false,
        error: 'Patient not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: patient._id.toString(),
        hospitalId: patient.hospitalId,
        firstName: patient.firstName,
        middleName: patient.middleName,
        lastName: patient.lastName,
        fullName: patient.fullName,
        gender: patient.gender,
        birthDate: patient.birthDate,
        age: patient.age,
        conditions: patient.conditions || [],
        medications: patient.medications || [],
        observations: patient.observations || [],
        immunizations: patient.immunizations || []
      }
    });
  } catch (error) {
    console.error('Error in /info/:id endpoint:', error);
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
    const patient = await Patient.findById(patientId).lean();

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
      data: {
        id: patient._id.toString(),
        ...patient
      },
      message: 'Patient selected successfully'
    });
  } catch (error) {
    console.error('Error in /:id endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve patient',
      message: error.message
    });
  }
});

module.exports = router;