const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  hospitalId: { 
    type: String, 
    required: true,
    unique: true
  },
  firstName: String,
  middleName: String,
  lastName: String,
  fullName: { 
    type: String, 
    required: true
  },
  gender: String,
  birthDate: String,
  age: Number,
  
  // Use Mixed type for flexible nested structures
  conditions: [mongoose.Schema.Types.Mixed],
  medications: [mongoose.Schema.Types.Mixed],
  observations: [mongoose.Schema.Types.Mixed],
  immunizations: [mongoose.Schema.Types.Mixed]
}, { 
  timestamps: true,
  collection: 'patients',
  strict: false  // Allow fields not defined in schema
});

// Index for faster queries
PatientSchema.index({ hospitalId: 1 });
PatientSchema.index({ fullName: 1 });

module.exports = mongoose.model('Patient', PatientSchema);
