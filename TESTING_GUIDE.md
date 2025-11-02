# Testing Guide

## 🧪 Complete Application Test

### Prerequisites

- Both servers running (Backend on 5000, Frontend on 3000)
- Fresh browser session (clear cache/sessionStorage)

### Test 1: Backend Health Check ✅

Open PowerShell and run:

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health" -Method GET
```

**Expected Output:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test 2: Get All Patients ✅

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/patient/list" -Method GET
```

**Expected Output:**

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "fullName": "Emily Davis",
      "hospitalId": "H001",
      ...
    },
    ...10 patients total...
  ]
}
```

### Test 3: Get Patient Info ✅

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/patient/info/1" -Method GET
```

**Expected Output:**

```json
{
  "success": true,
  "data": {
    "id": "1",
    "fullName": "Emily Davis",
    "conditions": [...],
    "medications": [...],
    ...
  }
}
```

### Test 4: Frontend User Flow ✅

#### Step 1: Open Application

1. Open browser to http://localhost:3000
2. Should see landing page with hero section
3. Click "Select Patient" button

#### Step 2: Patient Selection

1. Should see grid of 10 patient cards
2. Each card shows: Name, ID, Gender, Age, DOB, Conditions count
3. Click on any patient card
4. Should navigate to patient info page

#### Step 3: Patient Information

1. Should see patient demographics
2. Tabs for: Demographics, Conditions, Medications, Observations, Immunizations
3. All data should display correctly
4. Click "Start Assessment" button

#### Step 4: Assessment Part 1

1. Should see 4 sections:
   - Recent Falls (radio buttons)
   - High Risk Medications (radio buttons)
   - Psychological Factors (radio buttons)
   - Cognitive Impairment (radio buttons)
2. Select options for all 4 sections
3. Click "Save Draft" - Should see success message
4. Click "Next" button

#### Step 5: Assessment Part 2

1. Should see 11 risk factors with checkboxes
2. Check some boxes (e.g., Vision, Mobility)
3. Click "Save Draft" - Should see success message
4. Click "Submit Assessment"
5. Should see loader animation
6. Should navigate to results page

#### Step 6: Results Page

1. Should see 4 charts:
   - **Part 1 Risk Distribution** (Doughnut chart)
   - **Part 2 Risk Factors** (Pie chart)
   - **Assessment Score Distribution** (Bar chart)
   - **Risk Profile** (Radar chart)
2. Should see risk score and level
3. All charts should render properly

### Test 5: Data Persistence ✅

After submitting assessment, check bundle.json:

```powershell
Get-Content "c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project\bundle.json" | ConvertFrom-Json | Select-Object -ExpandProperty assessments
```

**Expected Output:**
Should see assessment entry with:

- patient_id
- patient_info
- assessments array with your submitted assessment

### Test 6: Draft Functionality ✅

#### Test Auto-Save

1. Start assessment
2. Fill Part 1 partially
3. Click "Save Draft"
4. Close browser tab
5. Open http://localhost:3000 again
6. Select same patient
7. Start assessment
8. **Expected**: Part 1 should have your saved data

#### Test Cross-Part Draft

1. Fill Part 1 completely
2. Click "Next"
3. Fill Part 2 partially
4. Click "Save Draft"
5. Refresh browser
6. Select patient and start assessment
7. **Expected**: Both Part 1 and Part 2 should have saved data

### Test 7: Multiple Assessments ✅

1. Complete assessment for Patient 1
2. View results
3. Go back to home
4. Select Patient 1 again
5. Complete another assessment
6. View results
7. **Expected**: Results page should show latest assessment

Check bundle.json:

```powershell
(Get-Content "bundle.json" | ConvertFrom-Json).assessments | Where-Object { $_.patient_id -eq "1" } | Select-Object -ExpandProperty assessments | Measure-Object
```

Should show 2 assessments for patient 1.

### Test 8: Error Handling ✅

#### Test No Patient Selected

1. Open http://localhost:3000/assessment directly
2. **Expected**: Should redirect to patient selection or show error

#### Test Backend Down

1. Stop backend server (Ctrl+C in backend terminal)
2. Try to select patient from frontend
3. **Expected**: Should show error message "Failed to load patients"
4. Restart backend and retry - should work

### Test 9: Session Management ✅

#### Test Session Persistence

1. Select patient
2. Open browser DevTools → Application → Cookies
3. Look for connect.sid cookie
4. **Expected**: Cookie should exist with session ID

### Test 10: Performance Check ✅

#### Test Page Load Times

1. Open DevTools → Network tab
2. Clear cache
3. Load patient selection page
4. **Expected**: Page loads in < 2 seconds
5. All 10 patients display correctly

## 🎯 Quick Smoke Test (5 minutes)

Run this minimal test to verify everything works:

1. ✅ Backend health: `Invoke-RestMethod -Uri "http://localhost:5000/health"`
2. ✅ Open http://localhost:3000
3. ✅ Click "Select Patient"
4. ✅ Click any patient card
5. ✅ Click "Start Assessment"
6. ✅ Fill Part 1, click Next
7. ✅ Fill Part 2, click Submit
8. ✅ View results with charts

If all 8 steps work, application is fully functional! ✅

## 🐛 Common Issues

### Issue: "Network Error" on patient selection

**Solution**:

1. Check backend is running: `Invoke-RestMethod -Uri "http://localhost:5000/health"`
2. Check CORS configuration in server.js

### Issue: Charts not displaying

**Solution**:

1. Open DevTools console
2. Check for Chart.js errors
3. Verify assessment data structure

### Issue: Assessment not saving

**Solution**:

1. Check bundle.json file permissions
2. Check backend console for errors
3. Verify write operations succeed

### Issue: Draft not loading

**Solution**:

1. Check browser sessionStorage (DevTools → Application → Session Storage)
2. Verify key "assessmentDraft" exists
3. Clear sessionStorage and retry

## 📊 Test Results Template

Copy this and fill in your results:

```
Test Date: ___________
Tester: ___________

Backend Health Check: ⬜ Pass ⬜ Fail
Get All Patients: ⬜ Pass ⬜ Fail
Get Patient Info: ⬜ Pass ⬜ Fail
Patient Selection: ⬜ Pass ⬜ Fail
Patient Info Display: ⬜ Pass ⬜ Fail
Assessment Part 1: ⬜ Pass ⬜ Fail
Assessment Part 2: ⬜ Pass ⬜ Fail
Submit with Loader: ⬜ Pass ⬜ Fail
Results Page Charts: ⬜ Pass ⬜ Fail
Data Persistence: ⬜ Pass ⬜ Fail
Draft Functionality: ⬜ Pass ⬜ Fail

Overall Status: ⬜ PASS ⬜ FAIL

Notes:
______________________________________
______________________________________
```

---

**Happy Testing! 🎉**
