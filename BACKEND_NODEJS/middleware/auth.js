const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  // Check for token in session first
  const sessionToken = req.session.access_token;
  
  // Check for token in Authorization header
  const authHeader = req.headers['authorization'];
  const headerToken = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  const token = sessionToken || headerToken;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    });
  }

  // For session tokens (UUIDs), just check if they exist in session
  if (token === sessionToken && req.session.user_id) {
    req.user = {
      id: req.session.user_id,
      username: req.session.username,
      role: req.session.role
    };
    return next();
  }

  // For JWT tokens, verify the token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};

// Role-based authorization middleware
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Check if user is authenticated (for optional authentication)
const checkAuth = (req, res, next) => {
  const sessionToken = req.session.access_token;
  const authHeader = req.headers['authorization'];
  const headerToken = authHeader && authHeader.split(' ')[1];
  
  const token = sessionToken || headerToken;
  
  if (token) {
    // If session token, get user from session
    if (token === sessionToken && req.session.user_id) {
      req.user = {
        id: req.session.user_id,
        username: req.session.username,
        role: req.session.role
      };
      req.authenticated = true;
    } else {
      // Try to verify JWT token
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        req.authenticated = true;
      } catch (error) {
        req.authenticated = false;
      }
    }
  } else {
    req.authenticated = false;
  }
  
  next();
};

module.exports = {
  authenticateToken,
  authorizeRole,
  checkAuth
};