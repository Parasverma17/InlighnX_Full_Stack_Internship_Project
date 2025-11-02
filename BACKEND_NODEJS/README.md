# InlignX Backend - Node.js/Express

This is the Node.js/Express.js backend for the InlignX healthcare application, converted from the original Python/Flask implementation.

## Features

- **Simple Patient Data Management**: Converted from FHIR format to simple JSON for easier handling
- **Assessment System**: Complete fall risk assessment functionality
- **Authentication**: JWT-based authentication with session management
- **RESTful API**: Clean and well-documented API endpoints
- **Data Persistence**: JSON file-based storage (easily replaceable with database)

## Quick Start

### 1. Install Dependencies

```bash
cd BACKEND_NODEJS
npm install
```

### 2. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/status` - Check authentication status

### Patients

- `GET /patient/list` - Get all patients (basic info)
- `GET /patient/:id` - Get specific patient and set in session
- `GET /patient/info` - Get current patient info (requires auth)
- `GET /patient/conditions` - Get patient conditions
- `GET /patient/medications` - Get patient medications
- `GET /patient/observations` - Get patient observations
- `GET /patient/immunizations` - Get patient immunizations

### Assessments

- `GET /assessment/draft` - Get assessment draft from session
- `POST /assessment/draft` - Save assessment draft to session
- `POST /assessment/submit` - Submit completed assessment
- `GET /assessment/result` - Get assessment results for current patient
- `GET /assessment/result/:assessmentId` - Get specific assessment
- `GET /assessment/all` - Get all assessments (admin)

### Health Check

- `GET /health` - Server health check

## Data Structure

### Patient Data (Simplified from FHIR)

```json
{
  "id": "patient-001",
  "hospitalId": "UR001",
  "firstName": "John",
  "lastName": "Doe",
  "fullName": "John Doe",
  "gender": "male",
  "birthDate": "1950-01-01",
  "age": 75,
  "conditions": [...],
  "medications": [...],
  "observations": [...],
  "immunizations": [...]
}
```

### Assessment Data

```json
{
  "assessment_id": "uuid",
  "timestamp": "2025-10-25T...",
  "risk_score": 15,
  "risk_level": "high",
  "part1": {...},
  "part2": {...}
}
```

## Default Users

The system comes with default users for testing:

1. **Admin User**

   - Username: `admin`
   - Password: `admin123`
   - Role: `admin`

2. **Doctor User**
   - Username: `doctor`
   - Password: `doctor123`
   - Role: `doctor`

## Changes from Python/Flask Version

1. **No FHIR Dependency**: Removed FHIR client and simplified data structure
2. **Simplified Authentication**: Basic JWT + session-based auth instead of SMART on FHIR
3. **JSON Storage**: File-based JSON storage instead of complex FHIR server integration
4. **Express.js Structure**: Modern Express.js patterns with proper middleware
5. **Better Error Handling**: Comprehensive error handling with meaningful responses

## File Structure

```
BACKEND_NODEJS/
├── data/
│   ├── patients.json          # Simplified patient data
│   ├── assessments.json       # Assessment storage
│   └── users.json            # User accounts
├── middleware/
│   └── auth.js               # Authentication middleware
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── patient.js            # Patient management routes
│   └── assessment.js         # Assessment routes
├── package.json
├── server.js                 # Main server file
└── README.md
```

## Environment Variables

Create a `.env` file for production:

```env
PORT=5000
JWT_SECRET=your-super-secret-key-here
NODE_ENV=production
```

## Development

### Adding New Routes

1. Create route file in `routes/` directory
2. Import and register in `server.js`
3. Add authentication middleware if needed

### Database Integration

To replace JSON files with a database:

1. Install database driver (mongoose, pg, etc.)
2. Replace file operations in route handlers
3. Update data models accordingly

## Testing

You can test the API using tools like Postman or curl:

```bash
# Health check
curl http://localhost:5000/health

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Get patients list
curl http://localhost:5000/patient/list
```

## Production Deployment

1. Set environment variables
2. Use process manager (PM2, Docker, etc.)
3. Set up reverse proxy (nginx)
4. Configure SSL/HTTPS
5. Set up database instead of JSON files
6. Configure logging and monitoring

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Update documentation for new features
4. Test all endpoints before submitting changes
