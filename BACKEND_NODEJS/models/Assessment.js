const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
  patient_id: { 
    type: String, 
    required: true,
    index: true 
  },
  patient_info: mongoose.Schema.Types.Mixed,  // Flexible structure
  assessments: [{
    assessment_id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString()
    },
    timestamp: { 
      type: Date, 
      default: Date.now,
      index: true
    },
    risk_score: Number,
    risk_level: String,  // Accept any string value (LOW, MEDIUM, HIGH, low, medium, high, etc.)
    part1: mongoose.Schema.Types.Mixed,  // Flexible nested structure
    part2: mongoose.Schema.Types.Mixed   // Flexible nested structure
  }]
}, { 
  timestamps: true,
  collection: 'assessments',
  strict: false  // Allow fields not defined in schema
});

// Index for faster queries
AssessmentSchema.index({ patient_id: 1, 'assessments.timestamp': -1 });

module.exports = mongoose.model('Assessment', AssessmentSchema);
