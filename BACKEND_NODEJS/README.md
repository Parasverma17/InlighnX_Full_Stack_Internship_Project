# InlighnX Backend - Node.js/Express

This is the Node.js/Express.js backend for the **InlighnX Fall Risk Assessment Tool**, a comprehensive healthcare application for assessing and managing fall risk in elderly patients (60+ years).

## Overview

InlighnX Backend provides a robust RESTful API for patient management, fall risk assessments, and data persistence. The system uses a simplified JSON-based data structure stored in `bundle.json` for easy data management and manipulation.

## Features

- **Patient Data Management**: Complete patient profiles with demographics, medical history, medications, and observations
- **Fall Risk Assessment System**:
  - Part 1: Scored sections (Falls history, Medications, Psychological factors, Cognitive impairment)
  - Part 2: Yes/No risk factor checklist (11 factors including vision, mobility, transfers, etc.)
  - Automatic risk scoring and level calculation (Low, Medium, High)
- **Session-Based State Management**: Patient selection and draft assessments stored in Express sessions
- **RESTful API**: Clean, well-documented endpoints with proper error handling
- **JSON File Storage**: Single `bundle.json` file for all application data
- **CORS Enabled**: Configured for React frontend on port 3000

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Session Management**: express-session
- **Authentication**: JWT + bcryptjs (ready for implementation)
- **Data Storage**: JSON files (fs-extra)
- **CORS**: Configured for localhost:3000

## Quick Start

### 1. Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### 2. Install Dependencies

```bash
cd BACKEND_NODEJS
npm install
```

### 3. Start the Server

```bash
# Development mode (with auto-reload using nodemon)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

### 4. Verify Server is Running

```bash
curl http://localhost:5000/health
```

Expected response:

```json
{
  "status": "OK",
  "message": "InlignX Backend is running",
  "timestamp": "2025-11-02T..."
}
```

## API Endpoints

### Health Check

- `GET /health` - Server health check and status

### Authentication (Routes defined, ready for implementation)

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/status` - Check authentication status

### Patients

#### Get All Patients

```
GET /patient/list
```

Returns array of patients with basic info (id, name, age, gender, etc.)

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "hospitalId": "UR011",
      "fullName": "Betty Ann Taylor",
      "age": 73,
      "gender": "female"
    }
  ]
}
```

#### Select Patient (Sets in Session)

```
GET /patient/:id
```

Selects a patient and stores their ID in the session.

**Response:**

```json
{
  "success": true,
  "message": "Patient selected",
  "patientId": "1"
}
```

#### Get Patient Info

```
GET /patient/info/:id
```

Returns complete patient information including demographics, conditions, medications, observations, and immunizations.

**Response:**

```json
{
  "id": "1",
  "hospitalId": "UR011",
  "fullName": "Betty Ann Taylor",
  "gender": "female",
  "birthDate": "1952-10-12",
  "age": 73,
  "conditions": [...],
  "medications": [...],
  "observations": [...],
  "immunizations": [...]
}
```

### Assessments

#### Submit Assessment

```
POST /assessment/submit
Content-Type: application/json

{
  "patientId": "1",
  "part1": {
    "falls": { "score": 5, "answers": {...} },
    "medications": { "score": 3, "answers": {...} },
    "psychological": { "score": 2, "answers": {...} },
    "cognitive": { "score": 5, "answers": {...} }
  },
  "part2": {
    "vision": { "value": true, "label": "Yes" },
    "mobility": { "value": false, "label": "No" },
    ...
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Assessment submitted successfully",
  "assessment_id": "uuid",
  "risk_score": 15,
  "risk_level": "high"
}
```

#### Get Assessment Result

```
GET /assessment/result?patientId=1
```

Returns the latest assessment for the specified patient.

**Response:**

```json
{
  "patient_id": "1",
  "patient_info": {
    "name": "Betty Ann Taylor",
    "id": "1",
    "birthDate": "1952-10-12",
    ...
  },
  "assessments": [
    {
      "assessment_id": "uuid",
      "timestamp": "2025-11-02T...",
      "risk_score": 15,
      "risk_level": "high",
      "part1": {...},
      "part2": {...}
    }
  ]
}
```

## Data Structure

### Bundle.json Structure

The application uses a single `bundle.json` file (located in project root) with the following structure:

```json
{
  "patients": [
    {
      "id": "1",
      "hospitalId": "UR011",
      "firstName": "Betty",
      "middleName": "Ann",
      "lastName": "Taylor",
      "fullName": "Betty Ann Taylor",
      "gender": "female",
      "birthDate": "1952-10-12",
      "age": 73,
      "conditions": [...],
      "medications": [...],
      "observations": [...],
      "immunizations": [...]
    }
  ],
  "assessments": [
    {
      "patient_id": "1",
      "patient_info": {...},
      "assessments": [
        {
          "assessment_id": "uuid",
          "timestamp": "2025-11-02T...",
          "risk_score": 15,
          "risk_level": "high",
          "part1": {...},
          "part2": {...}
        }
      ]
    }
  ],
  "users": []
}
```

### Assessment Risk Scoring

**Part 1 Scoring:**

- Falls History: 0-25 points
- Medications: 0-3 points
- Psychological Factors: 0-2 points
- Cognitive Impairment: 0-5 points

**Risk Levels:**

- **Low Risk**: Score 0-11
- **Medium Risk**: Score 12-24
- **High Risk**: Score 25+

**Part 2 Risk Factors:** (Yes/No checkboxes)

- Vision, Mobility, Transfers, Behaviours, ADL, Equipment, Footwear, Environment, Nutrition, Continence, Other

## File Structure

```
BACKEND_NODEJS/
├── data/
│   ├── patients.json          # Backup patient data
│   └── assessments.json       # Backup assessment data
├── middleware/
│   └── auth.js               # Authentication middleware (JWT)
├── routes/
│   ├── auth.js               # Authentication endpoints
│   ├── patient.js            # Patient management endpoints
│   └── assessment.js         # Assessment submission & retrieval
├── node_modules/
├── package.json              # Dependencies and scripts
├── package-lock.json
├── server.js                 # Main Express server
├── test-setup.js            # Testing configuration
└── README.md                # This file

PROJECT ROOT (../):
└── bundle.json              # Main data file (patients, assessments, users)
```

## Session Management

The backend uses Express sessions to maintain state:

- **Session Storage**: Memory store (use Redis in production)
- **Session Duration**: 24 hours
- **Cookie Settings**:
  - `secure: false` (set to `true` with HTTPS in production)
  - `httpOnly: true`
  - `sameSite: 'lax'`

**Session Data:**

```javascript
req.session = {
  patientId: "1",           // Currently selected patient
  assessmentDraft: {...},   // Draft assessment data
  userId: "user-id"         // Authenticated user ID
}
```

## CORS Configuration

The backend is configured to accept requests from the React frontend:

```javascript
cors({
  origin: "http://localhost:3000",
  credentials: true,
});
```

**Important:** Update `origin` in production to match your frontend domain.

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": "Additional error details"
}
```

**HTTP Status Codes:**

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Adding New Endpoints

1. **Create route handler** in appropriate file (`routes/patient.js`, `routes/assessment.js`, etc.)
2. **Add validation** for request body/params
3. **Update bundle.json** structure if needed
4. **Test endpoint** using Postman or curl
5. **Update this README** with new endpoint documentation

### Example: Adding a new patient endpoint

```javascript
// routes/patient.js
router.get("/patient/search", (req, res) => {
  const { query } = req.query;
  const bundleData = readBundleData();

  const results = bundleData.patients.filter((p) =>
    p.fullName.toLowerCase().includes(query.toLowerCase())
  );

  res.json({ success: true, data: results });
});
```

### Testing API Endpoints

**Using curl:**

```bash
# Get all patients
curl http://localhost:5000/patient/list

# Select a patient
curl http://localhost:5000/patient/1

# Get patient info
curl http://localhost:5000/patient/info/1

# Submit assessment
curl -X POST http://localhost:5000/assessment/submit \
  -H "Content-Type: application/json" \
  -d '{"patientId":"1","part1":{...},"part2":{...}}'

# Get assessment result
curl http://localhost:5000/assessment/result?patientId=1
```

**Using Postman:**

1. Import endpoints as collection
2. Set base URL: `http://localhost:5000`
3. Enable cookies for session management
4. Test each endpoint with sample data

## Production Deployment

### Recommended Setup

1. **Environment Variables**
   Create `.env` file:

   ```env
   PORT=5000
   NODE_ENV=production
   SESSION_SECRET=your-super-secret-key-here
   FRONTEND_URL=https://yourdomain.com
   ```

2. **Database Migration**

   - Replace `bundle.json` with proper database (MongoDB, PostgreSQL)
   - Update `readBundleData()` and `writeBundleData()` functions
   - Add connection pooling and error recovery

3. **Session Store**

   - Use Redis or database-backed session store
   - Configure session timeout and cleanup

4. **Security Enhancements**

   - Enable HTTPS (set `cookie.secure: true`)
   - Implement rate limiting
   - Add request validation (express-validator)
   - Enable helmet.js for security headers
   - Implement proper JWT authentication

5. **Process Management**

   ```bash
   # Using PM2
   npm install -g pm2
   pm2 start server.js --name "inlignx-backend"
   pm2 startup
   pm2 save
   ```

6. **Reverse Proxy (nginx)**

   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Monitoring & Logging**
   - Set up Winston or Morgan for logging
   - Configure error tracking (Sentry, Rollbar)
   - Monitor server health and performance

## Troubleshooting

### Common Issues

**1. CORS Errors**

- Ensure frontend is running on `http://localhost:3000`
- Check `withCredentials: true` is set in frontend axios config
- Verify CORS origin matches frontend URL

**2. Session Not Persisting**

- Check cookie settings in browser
- Ensure `credentials: true` in CORS config
- Verify session secret is set

**3. Cannot Find bundle.json**

- Ensure `bundle.json` exists in project root
- Check file permissions
- Verify path in route files: `../bundle.json`

**4. Port Already in Use**

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

## Contributing

1. Follow existing code structure and naming conventions
2. Add proper error handling for all operations
3. Update this README when adding new features
4. Test all endpoints before committing
5. Use meaningful commit messages
