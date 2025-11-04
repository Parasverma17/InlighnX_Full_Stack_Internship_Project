# 🚀 Quick Deployment Checklist

Follow these steps in order. Check each box as you complete it.

## ✅ Changes Made (Already Done)

- [x] Updated `BACKEND_NODEJS/server.js` for production CORS
- [x] Updated `FRONTEND/src/api/frat.js` to use environment variables
- [x] Created `FRONTEND/.env.production` for production API URL
- [x] Created `FRONTEND/.env.local` for local development
- [x] Created `FRONTEND/vercel.json` for Vercel configuration
- [x] Created `FRONTEND/.gitignore` to protect sensitive files
- [x] Created `DEPLOYMENT.md` with full instructions

## 📦 Step 1: Commit and Push to GitHub (5 minutes)

```bash
# Open PowerShell and navigate to project
cd C:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project

# Add all changes
git add -A

# Commit with message
git commit -m "feat: prepare for production deployment with Render and Vercel"

# Push to GitHub (replace YOUR_USERNAME with your GitHub username)
git push origin main
```

**If you don't have a GitHub repository yet:**

```bash
# 1. Go to https://github.com/new
# 2. Create repository: InlighnX_Full_Stack_Internship_Project
# 3. Don't initialize with README (we already have files)
# 4. Copy the commands shown, they look like:

git remote add origin https://github.com/YOUR_USERNAME/InlighnX_Full_Stack_Internship_Project.git
git branch -M main
git push -u origin main
```

- [ ] Code committed
- [ ] Code pushed to GitHub
- [ ] Repository visible at: https://github.com/YOUR_USERNAME/InlighnX_Full_Stack_Internship_Project

---

## 🌐 Step 2: Deploy Backend to Render (15 minutes)

### A. Create Render Account

1. [ ] Go to: https://render.com
2. [ ] Click "Get Started for Free"
3. [ ] Sign up with **GitHub account**
4. [ ] Authorize Render to access repositories

### B. Create Web Service

1. [ ] Click "New +" → "Web Service"
2. [ ] Find repository: `InlighnX_Full_Stack_Internship_Project`
3. [ ] Click "Connect"

### C. Configure Service

Fill in these exact values:

| Field          | Value                         |
| -------------- | ----------------------------- |
| Name           | `inlighnx-backend`            |
| Region         | `Singapore` (or closest)      |
| Branch         | `main`                        |
| Root Directory | `BACKEND_NODEJS` ⚠️ IMPORTANT |
| Runtime        | `Node`                        |
| Build Command  | `npm install`                 |
| Start Command  | `npm start`                   |
| Instance Type  | `Free`                        |

- [ ] All fields filled correctly

### D. Add Environment Variables

Click "Advanced" → Add these environment variables:

Copy these one by one (click "Add Environment Variable" button 7 times):

**Variable 1:**

```
Key: MONGODB_URI
Value: in env file mongo db
```

**Variable 2:**

```
Key: PORT
Value: 5000
```

**Variable 3:**

```
Key: NODE_ENV
Value: production
```

**Variable 4:**

```
Key: SESSION_SECRET
Value: jNJTo4ze83YFXvGi9EAyqd1QU0fRVwhg
```

**Variable 5:**

```
Key: FRONTEND_URL
Value: http://localhost:3000
```

(We'll update this later with Vercel URL)

**Variable 6:**

```
Key: JWT_SECRET
Value: your-jwt-secret-key-change-this
```

**Variable 7:**

```
Key: DB_NAME
Value: inlighnx
```

- [ ] All 7 environment variables added

### E. Deploy

1. [ ] Click "Create Web Service" button at bottom
2. [ ] Wait 2-3 minutes for deployment
3. [ ] Status shows "Live" (green badge)

### F. Test Backend

Copy your backend URL (looks like: `https://inlighnx-backend.onrender.com`)

**Backend URL**: ******\*\*******\_\_\_\_******\*\*******

Test in browser:

```
https://YOUR-BACKEND-NAME.onrender.com/health
```

Should return:

```json
{
  "status": "OK",
  "message": "InlighnX Backend is running",
  "database": "MongoDB Atlas",
  "environment": "production"
}
```

- [ ] Backend URL saved
- [ ] Health check returns OK
- [ ] Patients endpoint works: `/patient/list`

---

## 🎨 Step 3: Update Frontend with Backend URL (2 minutes)

### A. Update .env.production file

1. [ ] Open file: `FRONTEND\.env.production`
2. [ ] Replace the URL with your actual backend URL:

```env
REACT_APP_API_URL=https://YOUR-ACTUAL-BACKEND-URL.onrender.com
```

Example:

```env
REACT_APP_API_URL=https://inlighnx-backend.onrender.com
```

3. [ ] Save the file

### B. Commit and Push

```bash
cd C:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project

git add FRONTEND/.env.production

git commit -m "chore: update production API URL with Render backend"

git push origin main
```

- [ ] File updated with real backend URL
- [ ] Changes committed and pushed

---

## 🚀 Step 4: Deploy Frontend to Vercel (10 minutes)

### A. Create Vercel Account

1. [ ] Go to: https://vercel.com
2. [ ] Click "Sign Up"
3. [ ] Choose "Continue with GitHub"
4. [ ] Authorize Vercel to access repositories

### B. Import Project

1. [ ] Click "Add New..." → "Project"
2. [ ] Find repository: `InlighnX_Full_Stack_Internship_Project`
3. [ ] Click "Import"

### C. Configure Project

| Field            | Value                                         |
| ---------------- | --------------------------------------------- |
| Framework Preset | `Create React App` (auto-detected)            |
| Root Directory   | Click "Edit" → Select `FRONTEND` ⚠️ IMPORTANT |
| Build Command    | `npm run build` (auto-filled)                 |
| Output Directory | `build` (auto-filled)                         |

- [ ] Root directory set to `FRONTEND`
- [ ] Other settings auto-detected

### D. Add Environment Variable

Expand "Environment Variables" section:

```
Name: REACT_APP_API_URL
Value: https://YOUR-ACTUAL-BACKEND-URL.onrender.com
```

Select: **All Environments** (Production, Preview, Development)

- [ ] Environment variable added
- [ ] Matches your backend URL

### E. Deploy

1. [ ] Click "Deploy" button
2. [ ] Wait 2-3 minutes for build
3. [ ] Status shows "Ready"

### F. Test Frontend

Copy your frontend URL (looks like: `https://your-project-name.vercel.app`)

**Frontend URL**: ******\*\*******\_\_\_\_******\*\*******

Test in browser:

```
https://YOUR-FRONTEND-NAME.vercel.app
```

- [ ] Frontend URL saved
- [ ] Landing page loads correctly
- [ ] "Select Patient" button works
- [ ] Patient list appears

---

## 🔄 Step 5: Connect Frontend and Backend (5 minutes)

### A. Update Backend CORS

1. [ ] Go to: https://dashboard.render.com
2. [ ] Click your service: `inlighnx-backend`
3. [ ] Click "Environment" in left sidebar
4. [ ] Find `FRONTEND_URL` variable
5. [ ] Click "Edit" (pencil icon)
6. [ ] Update value to your Vercel URL:
   ```
   https://your-actual-frontend.vercel.app
   ```
7. [ ] Click "Save Changes"
8. [ ] Wait 1-2 minutes for automatic redeployment

- [ ] FRONTEND_URL updated in Render
- [ ] Backend redeployed

### B. Test Complete Flow

Open your frontend URL and test:

1. [ ] Landing page loads
2. [ ] Click "Select Patient"
3. [ ] Patient list loads (from MongoDB)
4. [ ] Select patient "Betty Ann Taylor"
5. [ ] Patient info page displays correctly
6. [ ] Click "Start Assessment"
7. [ ] Fill Part 1 (select some options)
8. [ ] Fill Part 2 (check some boxes)
9. [ ] Click "Submit Assessment"
10. [ ] Results page shows risk score
11. [ ] No errors in browser console (F12)

---

## 🎉 Final Checklist

### URLs to Save

```
Frontend: https://_____________________.vercel.app
Backend:  https://_____________________.onrender.com
Database: MongoDB Atlas (cluster0.uuzxkqe.mongodb.net)
```

### All Tests Pass

- [ ] Backend health check works
- [ ] Frontend loads completely
- [ ] Patient list fetches from database
- [ ] Assessment submission works
- [ ] Results display correctly
- [ ] No CORS errors in browser console
- [ ] MongoDB shows new data after submission

### Documentation

- [ ] Added URLs to resume/portfolio
- [ ] Shared links with instructor/team
- [ ] Saved URLs for future reference

---

## 💰 Cost Summary

**Monthly Costs: $0** (All free tiers)

- MongoDB Atlas M0: FREE (512MB)
- Render Free: FREE (sleeps after 15 min)
- Vercel Hobby: FREE (100GB bandwidth)

**Note**: Backend may take 30-60 seconds on first request after inactivity (free tier limitation)

---

## 🆘 Troubleshooting

### Backend Issues

**"Application failed to respond"**

- Check Render logs: Dashboard → Service → Logs
- Verify MongoDB connection string is correct
- Check all environment variables are set

**CORS errors**

- Verify `FRONTEND_URL` in Render matches Vercel URL exactly
- No trailing slashes
- Redeploy backend after updating

### Frontend Issues

**Build fails on Vercel**

- Check Vercel build logs
- Verify `FRONTEND` root directory is set
- Test build locally: `npm run build` in FRONTEND folder

**API calls fail**

- Check `REACT_APP_API_URL` in Vercel environment variables
- Open browser console (F12) to see actual API URL being used
- Verify backend is running (check health endpoint)

**Page not found on refresh**

- Verify `vercel.json` exists in FRONTEND folder
- Check vercel.json has catch-all route

---

## 📞 Support

**Render Docs**: https://render.com/docs  
**Vercel Docs**: https://vercel.com/docs  
**MongoDB Atlas**: https://www.mongodb.com/docs/atlas/

**Full Guide**: See `DEPLOYMENT.md` for detailed instructions

---

**Status**: Ready for deployment! 🚀  
**Time Needed**: ~30 minutes total  
**Difficulty**: Beginner-friendly with step-by-step guide
