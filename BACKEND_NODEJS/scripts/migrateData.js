require('dotenv').config();
const fs = require('fs-extra');
const path = require('path');
const mongoose = require('mongoose');
const Patient = require('../models/Patient');
const Assessment = require('../models/Assessment');

const BUNDLE_FILE = path.join(__dirname, '../../bundle.json');

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ ERROR: MONGODB_URI is not set in .env file');
      console.log('Please add your MongoDB Atlas connection string to the .env file');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Read bundle.json
const readBundleData = async () => {
  try {
    if (!fs.existsSync(BUNDLE_FILE)) {
      console.error(`❌ bundle.json not found at ${BUNDLE_FILE}`);
      return null;
    }
    
    const data = await fs.readJson(BUNDLE_FILE);
    console.log('✅ bundle.json loaded successfully');
    console.log(`   - Patients: ${data.patients?.length || 0}`);
    console.log(`   - Assessments: ${data.assessments?.length || 0}`);
    console.log(`   - Users: ${data.users?.length || 0}`);
    return data;
  } catch (error) {
    console.error('❌ Error reading bundle.json:', error.message);
    return null;
  }
};

// Migrate patients
const migratePatients = async (patients) => {
  console.log('\n📦 Migrating patients...');
  
  try {
    // Clear existing patients (optional - comment out to preserve existing data)
    // await Patient.deleteMany({});
    // console.log('   - Cleared existing patients');

    const patientMap = {}; // Map old IDs to new MongoDB IDs
    
    for (const patient of patients) {
      // Create new patient document
      const newPatient = new Patient({
        hospitalId: patient.hospitalId,
        fullName: patient.fullName,
        birthDate: patient.birthDate,
        gender: patient.gender,
        age: patient.age,
        conditions: patient.conditions || [],
        medications: patient.medications || [],
        observations: patient.observations || [],
        immunizations: patient.immunizations || []
      });

      const savedPatient = await newPatient.save();
      patientMap[patient.id] = savedPatient._id.toString();
      
      console.log(`   ✓ Migrated: ${patient.fullName} (${patient.hospitalId})`);
    }

    console.log(`✅ Migrated ${patients.length} patients`);
    return patientMap;
  } catch (error) {
    console.error('❌ Error migrating patients:', error.message);
    throw error;
  }
};

// Migrate assessments
const migrateAssessments = async (assessments, patientMap) => {
  console.log('\n📋 Migrating assessments...');
  
  try {
    // Clear existing assessments (optional - comment out to preserve existing data)
    // await Assessment.deleteMany({});
    // console.log('   - Cleared existing assessments');

    let migratedCount = 0;

    for (const patientAssessment of assessments) {
      const oldPatientId = patientAssessment.patient_id;
      const newPatientId = patientMap[oldPatientId];

      if (!newPatientId) {
        console.log(`   ⚠ Skipping assessments for patient ID ${oldPatientId} (not found in patient map)`);
        continue;
      }

      // Create new assessment document
      const newAssessment = new Assessment({
        patient_id: newPatientId,
        patient_info: {
          ...patientAssessment.patient_info,
          id: newPatientId // Update to new MongoDB ID
        },
        assessments: patientAssessment.assessments || []
      });

      await newAssessment.save();
      migratedCount++;
      
      const patientName = patientAssessment.patient_info?.name || 'Unknown';
      const assessmentCount = patientAssessment.assessments?.length || 0;
      console.log(`   ✓ Migrated: ${patientName} (${assessmentCount} assessment${assessmentCount !== 1 ? 's' : ''})`);
    }

    console.log(`✅ Migrated ${migratedCount} patient assessment records`);
  } catch (error) {
    console.error('❌ Error migrating assessments:', error.message);
    throw error;
  }
};

// Main migration function
const migrate = async () => {
  console.log('🚀 Starting data migration from bundle.json to MongoDB...\n');

  try {
    // Connect to MongoDB
    await connectDB();

    // Read bundle data
    const bundleData = await readBundleData();
    if (!bundleData) {
      console.log('❌ Migration aborted: Could not load bundle.json');
      process.exit(1);
    }

    // Migrate patients
    const patients = bundleData.patients || [];
    if (patients.length === 0) {
      console.log('⚠ No patients found in bundle.json');
    } else {
      const patientMap = await migratePatients(patients);

      // Migrate assessments
      const assessments = bundleData.assessments || [];
      if (assessments.length === 0) {
        console.log('\n⚠ No assessments found in bundle.json');
      } else {
        await migrateAssessments(assessments, patientMap);
      }
    }

    console.log('\n✅ Migration completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Verify the data in MongoDB Atlas dashboard');
    console.log('   2. Test your application endpoints');
    console.log('   3. Once verified, you can backup and remove bundle.json');
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error(error.stack);
  } finally {
    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
  }
};

// Run migration
migrate();
