# Quick Start Commands

## 🚀 Start Both Servers

### Option 1: Two Separate Terminals

**Terminal 1 (Backend):**

```powershell
cd "c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project\BACKEND_NODEJS"
npm start
```

**Terminal 2 (Frontend):**

```powershell
cd "c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project\FRONTEND"
npm start
```

### Option 2: Single Command (Run Both Concurrently)

First, ensure both have dependencies installed:

```powershell
cd "c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project\BACKEND_NODEJS" ; npm install ; cd "../FRONTEND" ; npm install
```

Then start both (you'll need to use Ctrl+C to stop both):

```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project\BACKEND_NODEJS' ; npm start" ; Start-Sleep -Seconds 2 ; cd "c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project\FRONTEND" ; npm start
```

## 🧪 Quick Health Check

Check if servers are running:

```powershell
# Backend health check
Invoke-RestMethod -Uri "http://localhost:5000/health" -Method GET

# Frontend check (should return HTML)
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing | Select-Object StatusCode
```

## 🔧 Troubleshooting Commands

### Check if ports are in use

```powershell
# Check port 5000 (Backend)
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue

# Check port 3000 (Frontend)
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
```

### Kill processes on ports (if needed)

```powershell
# Kill process on port 5000
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force

# Kill process on port 3000
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
```

## 📦 Install Dependencies (First Time Only)

```powershell
# Backend
cd "c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project\BACKEND_NODEJS"
npm install

# Frontend
cd "c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project\FRONTEND"
npm install
```

## 🌐 Access Application

Once both servers are running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📊 Test API Endpoints

```powershell
# Get all patients
Invoke-RestMethod -Uri "http://localhost:5000/patient/list" -Method GET

# Get specific patient
Invoke-RestMethod -Uri "http://localhost:5000/patient/info/1" -Method GET

# Check bundle.json
Get-Content "c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project\bundle.json" | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

## 🛑 Stop Servers

In each terminal where servers are running, press:

```
Ctrl + C
```

## 🔄 Restart After Changes

If you made code changes:

**Backend changes:**

```powershell
# In backend terminal
Ctrl + C
npm start
```

**Frontend changes:**

- Changes auto-reload (React hot reload)
- If not reloading, Ctrl+C and `npm start`

**bundle.json changes:**

- Backend auto-reads on each request
- No restart needed

## 📝 Quick Commands Reference

```powershell
# Navigate to project
cd "c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project"

# View structure
tree /F

# Check bundle.json
Get-Content bundle.json | ConvertFrom-Json

# Count patients
(Get-Content bundle.json | ConvertFrom-Json).patients.Count

# Count assessments
(Get-Content bundle.json | ConvertFrom-Json).assessments.Count

# View last assessment
(Get-Content bundle.json | ConvertFrom-Json).assessments[-1]

# Clear all assessments (CAUTION!)
$bundle = Get-Content bundle.json | ConvertFrom-Json
$bundle.assessments = @()
$bundle | ConvertTo-Json -Depth 10 | Set-Content bundle.json
```

## 🚨 Emergency Reset

If everything breaks:

```powershell
# 1. Stop all servers (Ctrl+C in all terminals)

# 2. Clear node_modules and reinstall
cd "c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project\BACKEND_NODEJS"
Remove-Item -Recurse -Force node_modules
npm install

cd "c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project\FRONTEND"
Remove-Item -Recurse -Force node_modules
npm install

# 3. Clear browser cache and sessionStorage
# Open DevTools → Application → Clear storage → Clear site data

# 4. Restart both servers
```

## ✅ Daily Workflow

```powershell
# Morning: Start work
cd "c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project"

# Start backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'BACKEND_NODEJS' ; npm start"

# Start frontend
cd FRONTEND
npm start

# Open browser to http://localhost:3000

# Evening: End work
# Press Ctrl+C in both terminals
```

---

**Pro Tip**: Create a PowerShell alias for quick start:

```powershell
# Add to your PowerShell profile ($PROFILE)
function Start-InlightX {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project\BACKEND_NODEJS' ; npm start"
    Start-Sleep -Seconds 2
    cd "c:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project\FRONTEND"
    npm start
}

# Then just run:
Start-InlightX
```
