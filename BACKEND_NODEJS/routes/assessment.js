const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment');
const Patient = require('../models/Patient');

// Helper function to get option labels
const getOptionLabels = () => {
  return {
    part1: {
      recentFalls: {
        none: "None in last 12 months",
        "3to12": "One or more between 3-12 months ago",
        "3mo": "One or more in last 3 months",
        inpatient: "One or more in last 3 months while inpatient/resident"
      },
      highRiskMeds: {
        none: "Not taking any of these medications",
        one: "Taking one high-risk medication",
        two: "Taking two high-risk medications",
        more: "Taking more than two high-risk medications"
      },
      psychological: {
        none: "None",
        mild: "Mild",
        moderate: "Moderate",
        severe: "Severe"
      },
      cognitive: {
        intact: "Intact",
        mild: "Mild",
        moderate: "Moderate",
        severe: "Severe"
      }
    },
    part2: {
      vision: "Vision",
      mobility: "Mobility",
      transfers: "Transfers",
      behaviours: "Behaviours",
      adl: "Activities of Daily Living (A.D.L's)",
      equipment: "Unsafe use of equipment",
      footwear: "Footwear/Clothing",
      environment: "Environment",
      nutrition: "Nutrition",
      continence: "Continence",
      other: "Other"
    }
  };
};

// Helper function to format assessment
const formatAssessment = (rawAssessment) => {
  const labels = getOptionLabels();
  const part1 = rawAssessment.part1 || {};
  const part2 = rawAssessment.part2 || {};
  
  const formatted = {
    part1: {},
    part2: {}
  };

  // Format part1
  for (const [key, value] of Object.entries(part1)) {
    const label = labels.part1[key] && labels.part1[key][value] ? labels.part1[key][value] : value;
    formatted.part1[key] = {
      value: value,
      label: label
    };
  }

  // Format part2
  for (const [key, value] of Object.entries(part2)) {
    const label = labels.part2[key] || key;
    formatted.part2[key] = {
      value: value,
      label: label
    };
  }

  return formatted;
};

// Helper function to get patient full info for assessment
const getPatientFullInfo = async (patientId) => {
  const patient = await Patient.findById(patientId).lean();
  
  if (!patient) {
    throw new Error('Patient not found');
  }

  // Format medical history
  const medHistory = (patient.conditions || []).map(condition => 
    `${condition.name} (${condition.status})`
  );

  // Format medications
  const medications = (patient.medications || []).map(med => med.name);

  // Format observations
  const observations = (patient.observations || []).map(obs => 
    `${obs.type}: ${obs.value} - ${obs.interpretation}`
  );

  // Get AMTS score
  const amtsObservation = (patient.observations || []).find(obs => 
    obs.type.toLowerCase().includes('abbreviated mental test')
  );
  const amtsScore = amtsObservation ? amtsObservation.value : null;

  // Format immunizations
  const immunizations = (patient.immunizations || []).map(imm => 
    `${imm.vaccine} on ${imm.date}`
  );

  return {
    id: patient._id.toString(),
    name: patient.fullName,
    birthDate: patient.birthDate,
    gender: patient.gender,
    age: patient.age,
    hospital_id: patient.hospitalId,
    medical_history: medHistory,
    medications: medications,
    observations: observations,
    amts_score: amtsScore,
    immunizations: immunizations
  };
};

// Get assessment draft
router.get('/draft', (req, res) => {
  try {
    const draft = req.session.current_assessment;
    if (draft) {
      res.json({
        success: true,
        part1: draft.part1 || {},
        part2: draft.part2 || {}
      });
    } else {
      res.json({
        success: true,
        part1: {},
        part2: {}
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve assessment draft',
      message: error.message
    });
  }
});

// Save assessment draft
router.post('/draft', (req, res) => {
  try {
    const data = req.body;
    req.session.current_assessment = data;
    
    res.json({
      success: true,
      message: 'Draft saved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to save assessment draft',
      message: error.message
    });
  }
});

// Submit assessment
router.post('/submit', async (req, res) => {
  try {
    const data = req.body;
    // Accept patient ID from body or session
    const patientId = data.patientId || req.session.patient_id;
    
    if (!patientId) {
      return res.status(400).json({
        success: false,
        error: 'No patient selected. Please select a patient first.'
      });
    }

    console.log('Submitting assessment for patient:', patientId);

    // Get patient full info
    const patientInfo = await getPatientFullInfo(patientId);
    
    // Format assessment
    const formattedAssessment = formatAssessment(data);
    
    // Add risk score and level from frontend
    const newAssessmentData = {
      timestamp: new Date(),
      risk_score: data.risk_score,
      risk_level: data.risk_level,
      part1: formattedAssessment.part1,
      part2: formattedAssessment.part2
    };

    // Find existing assessment for this patient
    let patientAssessment = await Assessment.findOne({ patient_id: patientId });
    
    if (!patientAssessment) {
      // Create new patient assessment entry
      patientAssessment = new Assessment({
        patient_id: patientId,
        patient_info: patientInfo,
        assessments: [newAssessmentData]
      });
    } else {
      // Update patient info and add new assessment
      patientAssessment.patient_info = patientInfo;
      patientAssessment.assessments.push(newAssessmentData);
    }
    
    await patientAssessment.save();

    const savedAssessment = patientAssessment.assessments[patientAssessment.assessments.length - 1];

    // Store in session for immediate retrieval
    req.session.assessment_result = savedAssessment;

    console.log('✅ Assessment saved to MongoDB');

    res.json({
      success: true,
      message: 'Assessment submitted successfully',
      assessment_id: savedAssessment.assessment_id
    });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit assessment',
      message: error.message
    });
  }
});

// Get assessment result
router.get('/result', async (req, res) => {
  try {
    // Accept patient ID from query param or session
    const patientId = req.query.patientId || req.session.patient_id;
    
    if (!patientId) {
      return res.status(400).json({
        success: false,
        error: 'No patient selected'
      });
    }

    const patientAssessment = await Assessment.findOne({ patient_id: patientId }).lean();
    
    if (patientAssessment) {
      res.json({
        success: true,
        patient_info: patientAssessment.patient_info,
        assessments: patientAssessment.assessments,
        total_assessments: patientAssessment.assessments.length
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'No assessment result found for this patient'
      });
    }
  } catch (error) {
    console.error('Error retrieving assessment result:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve assessment result',
      message: error.message
    });
  }
});

// Get specific assessment by ID
router.get('/result/:assessmentId', async (req, res) => {
  try {
    const patientId = req.session.patient_id;
    const assessmentId = req.params.assessmentId;
    
    if (!patientId) {
      return res.status(400).json({
        success: false,
        error: 'No patient selected'
      });
    }

    const patientAssessment = await Assessment.findOne({ patient_id: patientId }).lean();
    
    if (patientAssessment) {
      const assessment = patientAssessment.assessments.find(a => a.assessment_id === assessmentId);
      if (assessment) {
        res.json({
          success: true,
          patient_info: patientAssessment.patient_info,
          assessment: assessment
        });
      } else {
        res.status(404).json({
          success: false,
          error: 'Assessment not found'
        });
      }
    } else {
      res.status(404).json({
        success: false,
        error: 'No assessment data found for this patient'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve assessment',
      message: error.message
    });
  }
});

// Save to patient record (placeholder for future EHR integration)
router.post('/save', (req, res) => {
  try {
    // This would integrate with EHR system in the future
    res.json({
      success: true,
      message: 'Assessment saved to patient record',
      note: 'This is a placeholder endpoint for future EHR integration'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to save to patient record',
      message: error.message
    });
  }
});

// Get all assessments for all patients (admin endpoint)
router.get('/all', async (req, res) => {
  try {
    // Simple authentication check - in production, this should be more robust
    if (!req.session.access_token) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    const assessments = await Assessment.find({}).lean();
    
    res.json({
      success: true,
      assessments: assessments,
      total_patients: assessments.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve all assessments',
      message: error.message
    });
  }
});

module.exports = router;
