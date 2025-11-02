# InlightX Project Setup Guide

## 🎯 Project Overview

This is a full-stack healthcare assessment application with:

- **Frontend**: React (port 3000)
- **Backend**: Node.js/Express (port 5000)
- **Database**: JSON file-based storage (bundle.json)

## 📁 Project Structure

```
InlighnX_Full_Stack_Internship_Project/
├── FRONTEND/                 # React frontend application
│   ├── src/
│   │   ├── api/fhir.js      # API client (connects to port 5000)
│   │   ├── pages/           # React pages
│   │   └── components/      # Reusable components
│   └── package.json
├── BACKEND_NODEJS/          # Node.js/Express backend
│   ├── server.js           # Main server file
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── patient.js
│   │   └── assessment.js
│   └── package.json
├── bundle.json             # Single data source for all data
└── AI/                     # AI care plan module
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Step 1: Install Backend Dependencies

```powershell
cd BACKEND_NODEJS
npm install
```

### Step 2: Install Frontend Dependencies

```powershell
cd FRONTEND
npm install
```

## ▶️ Running the Application

### Start Backend Server (Terminal 1)

```powershell
cd BACKEND_NODEJS
npm start
```

Backend will run on: **http://localhost:5000**

### Start Frontend Server (Terminal 2)

```powershell
cd FRONTEND
npm start
```

Frontend will run on: **http://localhost:3000**

## 🔧 Important Changes

### ✅ What's New

1. **Single Backend**: Frontend now connects directly to BACKEND_NODEJS (port 5000)
2. **No JSON Server Required**: ~~You no longer need to run `npx json-server`~~
3. **Single Data Source**: All data (patients, assessments) stored in `bundle.json`
4. **Session Management**: Backend maintains user sessions for authentication

### 🔄 API Endpoints

#### Patient Routes (GET /patient/\*)

- `GET /patient/list` - Get all patients
- `GET /patient/info/:id` - Get patient details by ID
- `GET /patient/:id` - Select patient (stores in session)

#### Assessment Routes (POST /assessment/\*)

- `GET /assessment/draft` - Get assessment draft from session
- `POST /assessment/draft` - Save assessment draft to session
- `POST /assessment/submit` - Submit completed assessment
- `GET /assessment/result` - Get assessment results for current patient

#### Auth Routes (POST /auth/\*)

- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

## 📊 Data Flow

1. **Patient Selection**:

   - User selects patient from list
   - Patient ID stored in sessionStorage
   - Backend stores patient_id in session

2. **Assessment**:

   - Part 1 & Part 2 data collected
   - Draft auto-saved to sessionStorage
   - On submit, sent to `/assessment/submit`
   - Backend saves to bundle.json

3. **Results**:
   - Fetched from `/assessment/result`
   - Displays latest assessment with charts

## 🛠️ Troubleshooting

### Backend Issues

**Port 5000 already in use:**

```powershell
# Change port in BACKEND_NODEJS/server.js
const PORT = process.env.PORT || 5001;
```

**CORS Errors:**

- Backend already configured for CORS with origin: http://localhost:3000
- If frontend port changes, update `server.js`:

```javascript
cors({
  origin: "http://localhost:YOUR_NEW_PORT",
  credentials: true,
});
```

### Frontend Issues

**Network Errors:**

- Ensure backend is running on port 5000
- Check API_BASE in `FRONTEND/src/api/fhir.js`

**Patient Selection Not Working:**

- Clear browser cache and sessionStorage
- Check browser console for errors

**Assessment Not Saving:**

- Verify bundle.json has write permissions
- Check backend console for errors

## 📝 Development Notes

### Adding New Patients

Edit `bundle.json` and add to the `patients` array:

```json
{
  "id": "11",
  "fullName": "New Patient",
  "hospitalId": "H011",
  "birthDate": "1990-01-01",
  "gender": "Male",
  "age": 34,
  "conditions": [],
  "medications": [],
  "observations": [],
  "immunizations": []
}
```

### Viewing Assessment Data

Assessments are stored in `bundle.json` under the `assessments` array:

```json
{
  "assessments": [
    {
      "patient_id": "1",
      "patient_info": {...},
      "assessments": [
        {
          "assessment_id": "uuid-here",
          "timestamp": "2024-01-01T00:00:00Z",
          "risk_score": 5,
          "risk_level": "Medium",
          "part1": {...},
          "part2": {...}
        }
      ]
    }
  ]
}
```

## 🔐 Authentication

Currently using simple session-based auth:

- Username: `admin`
- Password: `password123`

For production, implement proper JWT or OAuth.

## 🎨 Styling

Frontend uses CSS modules and global styles:

- Main styles: `FRONTEND/src/index.css`
- Component styles: `FRONTEND/src/App.css`
- Page-specific styles: Individual page files

## 📦 Key Dependencies

### Backend

- express: Web framework
- express-session: Session management
- fs-extra: File operations
- cors: Cross-origin requests
- uuid: Unique ID generation

### Frontend

- react: UI library
- react-router-dom: Navigation
- axios: HTTP client
- chart.js: Data visualization
- react-chartjs-2: Chart components

## 🚫 What NOT to Do

1. ❌ Don't run `npx json-server bundle.json`
2. ❌ Don't manually edit bundle.json while app is running
3. ❌ Don't change API_BASE to port 3001
4. ❌ Don't use BACKEND folder (it's been removed)

## ✅ Quick Checklist

Before starting development:

- [ ] Backend installed (`cd BACKEND_NODEJS && npm install`)
- [ ] Frontend installed (`cd FRONTEND && npm install`)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] bundle.json exists in root directory
- [ ] No BACKEND folder (deleted)
- [ ] Not running json-server

## 📞 Support

If you encounter issues:

1. Check backend console for errors
2. Check browser console for errors
3. Verify both servers are running
4. Clear browser cache and sessionStorage
5. Restart both servers

---

**Last Updated**: January 2025
**Version**: 2.0 (Node.js Backend Integration)
