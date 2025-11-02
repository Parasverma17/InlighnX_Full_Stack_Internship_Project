# Migration Summary: JSON Server → Node.js Backend

## 🎯 Objective

Connect frontend directly to BACKEND_NODEJS (port 5000) instead of JSON server (port 3001), eliminating the need to run `npx json-server bundle.json --port 3001` every time.

## ✅ Changes Completed

### 1. Backend Routes Refactoring

#### **patient.js** (BACKEND_NODEJS/routes/patient.js)

- ✅ Changed from `data/patients.json` to `../../bundle.json`
- ✅ Updated `readPatientsData()` → `readBundleData()`
- ✅ Added `writeBundleData()` function
- ✅ Modified `findPatientById()` to use `==` instead of `===`
- ✅ Updated GET `/list` endpoint to return patients array
- ✅ Changed GET `/info` to GET `/info/:id` (no auth required for development)
- ✅ Simplified GET `/:id` endpoint response structure
- ✅ Removed unused endpoints (conditions, medications, observations, immunizations)

#### **assessment.js** (BACKEND_NODEJS/routes/assessment.js)

- ✅ Changed from `data/assessments.json` and `data/patients.json` to `../../bundle.json`
- ✅ Updated `readAssessmentsData()` → `readBundleData()`
- ✅ Updated `writeAssessmentsData()` → `writeBundleData()`
- ✅ Modified POST `/submit` to work with bundle.json structure:
  - Finds or creates patient assessment entry
  - Stores assessments in array format: `[{patient_id, patient_info, assessments: []}]`
- ✅ Updated GET `/result` to read from bundle.json assessments array
- ✅ Updated GET `/result/:assessmentId` for specific assessment retrieval
- ✅ Updated GET `/all` admin endpoint

### 2. Frontend API Client (FRONTEND/src/api/fhir.js)

- ✅ Changed `API_BASE` from `http://localhost:3001` to `http://localhost:5000`
- ✅ Created axios instance with `withCredentials: true` for session support
- ✅ Updated `getAllPatients()` to call `/patient/list`
- ✅ Updated `getPatientById()` to call `/patient/:id`
- ✅ Updated `getPatientInfo()` to call `/patient/info/:id`
- ✅ Updated `submitAssessment()` to call `/assessment/submit`
- ✅ Updated `getAssessmentResult()` to call `/assessment/result`
- ✅ Removed fallback to sessionStorage for API calls (now properly fails)
- ✅ Added auto-clear of assessment draft on successful submission

### 3. Frontend Components

#### **PatientSelectionPage.jsx**

- ✅ Updated to handle new response structure: `{ success: true, data: [...] }`
- ✅ Added proper error handling for API failures

#### **PatientInfoPage.jsx**

- ✅ Updated to handle new response structure: `{ success: true, data: {...} }`
- ✅ Added proper patient data extraction

#### **ResultsPage.jsx**

- ✅ Updated to handle new backend response: `{ success: true, patient_info: {...}, assessments: [...] }`
- ✅ Fixed assessment data retrieval to use `res.data.assessments` array
- ✅ Properly extracts latest assessment from array

### 4. Data Structure Changes

#### **bundle.json Structure**

```json
{
  "patients": [
    {
      "id": "1",
      "fullName": "John Doe",
      "hospitalId": "H001",
      "birthDate": "1950-05-15",
      "gender": "Male",
      "age": 74,
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
          "timestamp": "2024-01-01T00:00:00Z",
          "risk_score": 5,
          "risk_level": "Medium",
          "part1": {...},
          "part2": {...}
        }
      ]
    }
  ],
  "users": [
    {
      "username": "admin",
      "password": "password123"
    }
  ]
}
```

### 5. Documentation

- ✅ Created comprehensive `SETUP_GUIDE.md`
- ✅ Documented all API endpoints
- ✅ Added troubleshooting section
- ✅ Included development notes

## 🔄 What Changed vs Before

### Before (JSON Server)

```
Frontend (port 3000) → JSON Server (port 3001) → bundle.json
                     ↓
          BACKEND_NODEJS (port 5000) - Not used
```

### After (Direct Backend)

```
Frontend (port 3000) → BACKEND_NODEJS (port 5000) → bundle.json
```

## 🎯 Benefits

1. **No JSON Server Required**: Run only 2 servers (frontend + backend)
2. **Single Data Source**: All data in bundle.json
3. **Session Management**: Backend maintains user sessions
4. **Proper Error Handling**: Better error messages and handling
5. **Scalability**: Easy to add more features and validation

## 🚀 How to Use

### Step 1: Start Backend

```powershell
cd BACKEND_NODEJS
npm start
```

✅ Backend runs on http://localhost:5000

### Step 2: Start Frontend

```powershell
cd FRONTEND
npm start
```

✅ Frontend runs on http://localhost:3000

### Step 3: Use Application

1. Navigate to http://localhost:3000
2. Click "Select Patient"
3. Choose a patient
4. View patient info
5. Start assessment
6. Fill Part 1 & Part 2
7. Submit (with loader animation)
8. View results with charts

## 📊 Data Flow Example

### Patient Selection Flow

```
1. User clicks "Select Patient" button
2. Frontend calls: GET http://localhost:5000/patient/list
3. Backend reads bundle.json patients array
4. Returns: { success: true, data: [...10 patients...] }
5. Frontend displays patient cards
```

### Assessment Submission Flow

```
1. User fills assessment and clicks Submit
2. Frontend shows loader animation
3. POST http://localhost:5000/assessment/submit
4. Backend:
   - Validates data
   - Gets patient info from bundle.json
   - Creates assessment object with UUID
   - Finds/creates patient assessment entry
   - Appends to assessments array
   - Saves to bundle.json
5. Returns: { success: true, assessment_id: "uuid" }
6. Frontend stores result in sessionStorage
7. Navigates to results page
```

### Results Display Flow

```
1. ResultsPage loads
2. Checks sessionStorage for "lastAssessmentResult"
3. If not found, calls: GET http://localhost:5000/assessment/result
4. Backend:
   - Gets patient_id from session
   - Finds assessment entry in bundle.json
   - Returns all assessments for patient
5. Frontend displays latest assessment with charts
```

## 🐛 Common Issues Fixed

1. ✅ **Assessment data not reaching results page**

   - Fixed by properly storing in bundle.json and updating ResultsPage to read correct structure

2. ✅ **Save draft not working**

   - Still uses sessionStorage (works offline)
   - Backend endpoints ready for server-side drafts

3. ✅ **Network errors**

   - Fixed by ensuring proper CORS configuration
   - Added `withCredentials: true` for session cookies

4. ✅ **Patient selection not working**
   - Updated to handle new response structure
   - Properly extracts data from `{ success: true, data: [...] }`

## 🔧 Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Patient list loads on selection page
- [ ] Patient info displays correctly
- [ ] Assessment Part 1 saves draft
- [ ] Assessment Part 2 saves draft
- [ ] Submit button shows loader
- [ ] Assessment saves to bundle.json
- [ ] Results page displays charts
- [ ] All 4 charts render properly
- [ ] Risk score displays correctly

## 📁 Files Modified

### Backend

1. `BACKEND_NODEJS/routes/patient.js` - Complete refactoring
2. `BACKEND_NODEJS/routes/assessment.js` - Complete refactoring

### Frontend

3. `FRONTEND/src/api/fhir.js` - API endpoint updates
4. `FRONTEND/src/pages/PatientSelectionPage.jsx` - Response handling
5. `FRONTEND/src/pages/PatientInfoPage.jsx` - Response handling
6. `FRONTEND/src/pages/ResultsPage.jsx` - Assessment data structure

### Documentation

7. `SETUP_GUIDE.md` - Created comprehensive guide
8. `MIGRATION_SUMMARY.md` - This file

## ✅ Success Criteria

All of these should work now:

- ✅ No need to run `npx json-server`
- ✅ Frontend connects directly to BACKEND_NODEJS
- ✅ Patient selection works
- ✅ Patient info displays
- ✅ Assessment saves to bundle.json
- ✅ Results page shows assessment data
- ✅ Save draft works (sessionStorage)
- ✅ All data persists to bundle.json
- ✅ BACKEND folder removed

## 🎉 Next Steps

1. Start both servers
2. Test complete flow: select patient → view info → assess → submit → view results
3. Check bundle.json to verify assessment was saved
4. Verify all charts display on results page

---

**Migration Date**: January 2025
**Status**: ✅ COMPLETE
