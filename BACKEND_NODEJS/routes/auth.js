const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const USERS_FILE = path.join(__dirname, '../data/users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// Helper function to read users data
const readUsersData = async () => {
  try {
    const data = await fs.readJson(USERS_FILE);
    return data;
  } catch (error) {
    // If file doesn't exist, create it with default admin user
    const defaultUsers = {
      users: [
        {
          id: 'admin-001',
          username: 'admin',
          email: 'admin@inlignx.com',
          password: await bcrypt.hash('admin123', 10), // Default password
          role: 'admin',
          firstName: 'System',
          lastName: 'Administrator',
          createdAt: new Date().toISOString()
        },
        {
          id: 'user-001',
          username: 'doctor',
          email: 'doctor@inlignx.com',
          password: await bcrypt.hash('doctor123', 10), // Default password
          role: 'doctor',
          firstName: 'Dr. John',
          lastName: 'Smith',
          createdAt: new Date().toISOString()
        }
      ]
    };
    await fs.writeJson(USERS_FILE, defaultUsers, { spaces: 2 });
    return defaultUsers;
  }
};

// Helper function to write users data
const writeUsersData = async (data) => {
  try {
    await fs.writeJson(USERS_FILE, data, { spaces: 2 });
    return true;
  } catch (error) {
    console.error('Error writing users data:', error);
    return false;
  }
};

// Helper function to find user by username or email
const findUser = async (identifier) => {
  const data = await readUsersData();
  return data.users.find(user => 
    user.username === identifier || user.email === identifier
  );
};

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required'
      });
    }

    // Find user
    const user = await findUser(username);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user);

    // Set session data (simulating SMART on FHIR flow)
    req.session.access_token = token;
    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.role = user.role;

    // Return success response
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      token: token
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Login failed',
      message: error.message
    });
  }
});

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, role = 'doctor' } = req.body;

    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    // Check if user already exists
    const existingUser = await findUser(username) || await findUser(email);
    
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User already exists with this username or email'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
      createdAt: new Date().toISOString()
    };

    // Add user to data
    const usersData = await readUsersData();
    usersData.users.push(newUser);
    
    const success = await writeUsersData(usersData);
    
    if (!success) {
      throw new Error('Failed to save user data');
    }

    // Return success response (without password)
    const { password: _, ...userResponse } = newUser;
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userResponse
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Registration failed',
      message: error.message
    });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  try {
    // Clear session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: 'Could not log out'
        });
      }
      
      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Logout failed',
      message: error.message
    });
  }
});

// Check authentication status
router.get('/status', (req, res) => {
  try {
    if (req.session.access_token && req.session.user_id) {
      res.json({
        success: true,
        authenticated: true,
        user: {
          id: req.session.user_id,
          username: req.session.username,
          role: req.session.role
        }
      });
    } else {
      res.json({
        success: true,
        authenticated: false
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Could not check authentication status',
      message: error.message
    });
  }
});

// SMART on FHIR-like authorize endpoint (simplified)
router.get('/authorize', (req, res) => {
  try {
    // This is a simplified version of SMART on FHIR authorization
    // In a real implementation, this would redirect to the EHR's authorization server
    
    const { response_type, client_id, redirect_uri, scope, state } = req.query;
    
    if (!response_type || !client_id || !redirect_uri) {
      return res.status(400).json({
        success: false,
        error: 'Missing required parameters'
      });
    }

    // For demonstration purposes, we'll return an authorization code
    const authCode = uuidv4();
    
    // Store auth code in session (in production, use a proper store)
    req.session.auth_code = authCode;
    req.session.client_id = client_id;
    req.session.redirect_uri = redirect_uri;
    
    res.json({
      success: true,
      message: 'Authorization code generated',
      auth_code: authCode,
      state: state,
      redirect_uri: redirect_uri
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Authorization failed',
      message: error.message
    });
  }
});

// Token exchange endpoint (SMART on FHIR-like)
router.post('/token', async (req, res) => {
  try {
    const { grant_type, code, client_id, redirect_uri } = req.body;
    
    if (grant_type !== 'authorization_code') {
      return res.status(400).json({
        success: false,
        error: 'Unsupported grant type'
      });
    }

    // Verify auth code (simplified)
    if (code !== req.session.auth_code || client_id !== req.session.client_id) {
      return res.status(401).json({
        success: false,
        error: 'Invalid authorization code'
      });
    }

    // Generate access token
    const accessToken = uuidv4();
    
    // Set session data
    req.session.access_token = accessToken;
    
    res.json({
      success: true,
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600,
      scope: 'patient/*.read'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Token exchange failed',
      message: error.message
    });
  }
});

module.exports = router;