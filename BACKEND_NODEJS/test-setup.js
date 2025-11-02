// Simple test to verify the backend functionality
const express = require('express');
console.log('Express module loaded successfully');

const cors = require('cors');
console.log('CORS module loaded successfully');

const session = require('express-session');
console.log('Express-session module loaded successfully');

const fs = require('fs-extra');
console.log('fs-extra module loaded successfully');

const { v4: uuidv4 } = require('uuid');
console.log('UUID module loaded successfully');

const bcrypt = require('bcryptjs');
console.log('bcryptjs module loaded successfully');

const jwt = require('jsonwebtoken');
console.log('jsonwebtoken module loaded successfully');

console.log('All modules loaded successfully! The backend should work fine.');

// Test reading the patients data
const path = require('path');
const PATIENTS_FILE = path.join(__dirname, 'data/patients.json');

fs.readJson(PATIENTS_FILE)
  .then(data => {
    console.log(`✅ Successfully loaded ${data.patients.length} patients from JSON file`);
    console.log('Sample patient:', data.patients[0].fullName);
  })
  .catch(error => {
    console.error('❌ Error reading patients file:', error.message);
  });

console.log('Backend setup verification complete!');