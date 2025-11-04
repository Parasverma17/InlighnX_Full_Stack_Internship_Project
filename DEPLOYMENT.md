# 🚀 Deployment Guide - InlighnX Application

This guide provides step-by-step instructions to deploy your InlighnX application to production.

## ✅ Pre-Deployment Checklist

Before starting deployment, ensure:

- [x] MongoDB Atlas cluster is running with data migrated
- [x] Backend runs locally (`npm start` in BACKEND_NODEJS)
- [x] Frontend runs locally (`npm start` in FRONTEND)
- [x] GitHub repository exists
- [ ] Code is committed and pushed to GitHub

---

## 📦 Part 1: Deploy Backend to Render (15 minutes)

### Step 1: Commit and Push Code

```bash
# Navigate to project root
cd C:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project

# Add all changes
git add .

# Commit with message
git commit -m "feat: prepare for production deployment"

# Push to GitHub (if not already done)
git push origin main
```

### Step 2: Sign Up for Render

1. Go to: **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with **GitHub account** (recommended)
4. Authorize Render to access your GitHub repositories

### Step 3: Create Web Service

1. **From Render Dashboard**:

   - Click **"New +"** button (top right)
   - Select **"Web Service"**

2. **Connect Repository**:

   - Find your repository: `InlighnX_Full_Stack_Internship_Project`
   - Click **"Connect"**

3. **Configure Service**:

   Fill in these details:

   | Field              | Value                           |
   | ------------------ | ------------------------------- |
   | **Name**           | `inlighnx-backend`              |
   | **Region**         | `Singapore` (or closest to you) |
   | **Branch**         | `main`                          |
   | **Root Directory** | `BACKEND_NODEJS`                |
   | **Runtime**        | `Node`                          |
   | **Build Command**  | `npm install`                   |
   | **Start Command**  | `npm start`                     |
   | **Instance Type**  | `Free`                          |

4. **Add Environment Variables**:

   Click **"Advanced"** → Scroll to **"Environment Variables"**

   Add these variables one by one (click **"Add Environment Variable"**):

   ```env
   MONGODB_URI
   mongodb+srv://parasverma1710_db_user:HTqmn1FilQXZi8ZY@cluster0.uuzxkqe.mongodb.net/inlighnx?retryWrites=true&w=majority&appName=Cluster0

   PORT
   5000

   NODE_ENV
   production

   SESSION_SECRET
   jNJTo4ze83YFXvGi9EAyqd1QU0fRVwhg

   FRONTEND_URL
   http://localhost:3000

   JWT_SECRET
   your-jwt-secret-key-change-this

   DB_NAME
   inlighnx
   ```

   ⚠️ **Note**: We'll update `FRONTEND_URL` after deploying frontend in Part 2

5. **Create Web Service**:
   - Click **"Create Web Service"** button at bottom
   - Wait 2-3 minutes for deployment

### Step 4: Verify Backend Deployment

1. **Check Deployment Status**:

   - You'll see a build log in real-time
   - Wait for: ✅ **"Live"** status (green badge)
   - Your backend URL will be: `https://inlighnx-backend.onrender.com`
   - (Or your custom name: `https://your-name.onrender.com`)

2. **Test Backend**:

   Open these URLs in browser or use curl:

   ```bash
   # Health check
   https://inlighnx-backend.onrender.com/health

   # Should return:
   {
     "status": "OK",
     "message": "InlighnX Backend is running",
     "database": "MongoDB Atlas",
     "environment": "production"
   }

   # Test patients endpoint
   https://inlighnx-backend.onrender.com/patient/list

   # Should return: JSON with 10 patients
   ```

3. **Save Your Backend URL**:

   **IMPORTANT**: Copy your backend URL, you'll need it for frontend deployment!

   Example: `https://inlighnx-backend.onrender.com`

### Step 5: Troubleshooting Backend

| Issue                           | Solution                                                    |
| ------------------------------- | ----------------------------------------------------------- |
| Build fails                     | Check logs for missing dependencies, verify `package.json`  |
| "Application failed to respond" | Check environment variables are set correctly               |
| MongoDB connection error        | Verify `MONGODB_URI` is correct, check Atlas network access |
| First request slow (30-60 sec)  | Normal for free tier - service "wakes up" from sleep        |

---

## 🎨 Part 2: Deploy Frontend to Vercel (10 minutes)

### Step 1: Update Frontend Environment File

**Before deploying**, update the production environment file:

1. Open: `FRONTEND/.env.production`

2. Replace the URL with your **actual Render backend URL**:

   ```env
   REACT_APP_API_URL=https://inlighnx-backend.onrender.com
   ```

   (Use the URL from Part 1, Step 4)

3. Save the file

### Step 2: Commit Frontend Changes

```bash
# Add updated environment file
git add FRONTEND/.env.production

# Commit
git commit -m "chore: update production API URL"

# Push to GitHub
git push origin main
```

### Step 3: Sign Up for Vercel

1. Go to: **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your repositories

### Step 4: Import Project

1. **From Vercel Dashboard**:

   - Click **"Add New..."** button (top right)
   - Select **"Project"**

2. **Import Repository**:

   - Find: `InlighnX_Full_Stack_Internship_Project`
   - Click **"Import"**

3. **Configure Project**:

   | Field                | Value                                |
   | -------------------- | ------------------------------------ |
   | **Framework Preset** | `Create React App` (auto-detected)   |
   | **Root Directory**   | Click **"Edit"** → Select `FRONTEND` |
   | **Build Command**    | `npm run build` (auto-filled)        |
   | **Output Directory** | `build` (auto-filled)                |
   | **Install Command**  | `npm install` (auto-filled)          |

4. **Add Environment Variables**:

   Click **"Environment Variables"** section (expand if collapsed)

   Add this variable:

   | Name                | Value                                   |
   | ------------------- | --------------------------------------- |
   | `REACT_APP_API_URL` | `https://inlighnx-backend.onrender.com` |

   Select: **All Environments** (Production, Preview, Development)

5. **Deploy**:
   - Click **"Deploy"** button
   - Wait 2-3 minutes for build and deployment

### Step 5: Verify Frontend Deployment

1. **Check Deployment Status**:

   - Watch build logs
   - Wait for: **"Building"** → **"Deploying"** → **"Ready"**
   - Your URL will be shown: `https://your-project.vercel.app`

2. **Test Frontend**:

   Click **"Visit"** button or open the URL:

   ```
   https://your-project-name.vercel.app
   ```

   Test these features:

   - [ ] Landing page loads correctly
   - [ ] Click "Select Patient" button
   - [ ] Patient list loads (from MongoDB)
   - [ ] Select a patient
   - [ ] Patient info displays
   - [ ] Click "Start Assessment"
   - [ ] Assessment form works
   - [ ] Submit assessment
   - [ ] Results page displays

3. **Check Browser Console** (F12):

   - Should see: `🔗 API Base URL: https://inlighnx-backend.onrender.com`
   - No CORS errors
   - No 404 errors

4. **Save Your Frontend URL**:

   Example: `https://inlighnx-frontend.vercel.app`

### Step 6: Troubleshooting Frontend

| Issue               | Solution                                                      |
| ------------------- | ------------------------------------------------------------- |
| Build fails         | Check `package.json` dependencies, verify all files committed |
| CORS error          | Update backend `FRONTEND_URL` in Render (see Part 3)          |
| API calls fail      | Verify `REACT_APP_API_URL` is set correctly in Vercel         |
| 404 on page refresh | Check `vercel.json` exists in FRONTEND folder                 |
| Blank page          | Check browser console for errors, verify build succeeded      |

---

## 🔄 Part 3: Connect Frontend and Backend (5 minutes)

Now that both are deployed, connect them properly:

### Step 1: Update Backend CORS

1. **Go to Render Dashboard**: https://dashboard.render.com

2. **Select Your Service**: `inlighnx-backend`

3. **Update Environment Variables**:

   - Click **"Environment"** in left sidebar
   - Find `FRONTEND_URL` variable
   - Click **"Edit"** (pencil icon)
   - Update value to your Vercel URL:
     ```
     https://your-project-name.vercel.app
     ```
   - Click **"Save Changes"**

4. **Redeploy Backend**:
   - Service will automatically redeploy with new environment variable
   - Wait 1-2 minutes for redeployment
   - Status will show: "Deploying..." → "Live"

### Step 2: Test Complete Flow

1. **Open Frontend**: `https://your-project-name.vercel.app`

2. **Test Full Workflow**:

   - [ ] Landing page loads
   - [ ] Navigate to "Select Patient"
   - [ ] Patient list appears (from MongoDB)
   - [ ] Select a patient (e.g., "Betty Ann Taylor")
   - [ ] View patient information page
   - [ ] Click "Start Assessment"
   - [ ] Fill out Part 1 (Recent Falls, Medications, etc.)
   - [ ] Fill out Part 2 (Vision, Mobility, etc.)
   - [ ] Submit assessment
   - [ ] View results page with risk score
   - [ ] Check MongoDB Atlas to see new assessment saved

3. **Test Different Browsers**:
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Edge
   - [ ] Mobile browser (optional)

### Step 3: Final Checks

✅ **Backend Status**:

- [ ] Health endpoint responds: `https://your-backend.onrender.com/health`
- [ ] Patients API works: `https://your-backend.onrender.com/patient/list`
- [ ] MongoDB connected (check Render logs)

✅ **Frontend Status**:

- [ ] Site loads: `https://your-frontend.vercel.app`
- [ ] No console errors (F12)
- [ ] API calls succeed
- [ ] Assessment submission works

✅ **Database Status**:

- [ ] MongoDB Atlas cluster running
- [ ] Collections visible in Atlas dashboard
- [ ] New data saved after assessment submission

---

## 📝 Your Deployment URLs

After completing all steps, record your URLs:

```
Frontend (Vercel):  https://your-project-name.vercel.app
Backend (Render):   https://inlighnx-backend.onrender.com
Database (MongoDB): MongoDB Atlas (cloud-hosted)
```

**Share these with**:

- Portfolio/resume
- Project documentation
- Team members
- Instructors/reviewers

---

## 🎯 Quick Deployment Summary

**Time Required**: ~30 minutes total

- Backend deployment: 15 minutes
- Frontend deployment: 10 minutes
- Testing & connection: 5 minutes

**Costs**:

- MongoDB Atlas M0: **FREE** (512MB)
- Render Free Tier: **FREE** (sleeps after 15 min inactive)
- Vercel Hobby: **FREE** (100GB bandwidth/month)
- **Total: $0/month** 🎉

**Limitations of Free Tier**:

- Backend sleeps after 15 minutes (first request wakes it up, takes 30-60 seconds)
- 750 hours/month on Render
- 100GB bandwidth/month on Vercel

**To Upgrade** (for production):

- Render: $7/month (always-on, no sleep)
- Vercel: $20/month (Pro features)
- MongoDB: $9/month (2GB storage)

---

## 🆘 Common Issues & Solutions

### Issue: "Cannot GET /patient/list"

**Cause**: Backend not running or wrong URL

**Solution**:

```bash
# Test backend directly
curl https://your-backend.onrender.com/patient/list

# Check Render logs for errors
# Verify backend is "Live" in Render dashboard
```

### Issue: CORS Error in Browser

**Cause**: Backend doesn't allow frontend origin

**Solution**:

1. Check `FRONTEND_URL` in Render environment variables
2. Verify it matches your Vercel URL exactly (no trailing slash)
3. Redeploy backend after updating

### Issue: "Application Failed to Respond" on Render

**Cause**: Backend crashed or can't connect to MongoDB

**Solution**:

1. Check Render logs: Dashboard → Your Service → Logs
2. Look for error messages
3. Verify `MONGODB_URI` environment variable is correct
4. Check MongoDB Atlas network access allows all IPs (0.0.0.0/0)

### Issue: Vercel Build Fails

**Cause**: Missing dependencies or build errors

**Solution**:

```bash
# Test build locally
cd FRONTEND
npm run build

# If it fails locally, fix errors first
# Then commit and push to trigger new deployment
```

### Issue: Environment Variables Not Working

**Cause**: Variables not set or wrong name

**Solution**:

- Verify variable name starts with `REACT_APP_` for frontend
- Check spelling and capitalization
- Redeploy after adding/updating variables
- For Vercel: Environment → Add Variable → Redeploy

---

## 🎉 Success!

If all tests pass, **congratulations!** Your InlighnX application is now:

✅ **Live and accessible** worldwide  
✅ **Cloud-hosted** on professional platforms  
✅ **Production-ready** with MongoDB Atlas  
✅ **Portfolio-worthy** with deployment links

**Next Steps**:

1. Add deployment URLs to your resume
2. Share links in your portfolio
3. Monitor usage in Render/Vercel dashboards
4. Check MongoDB Atlas for data storage
5. Consider custom domain (optional)

---

## 📞 Support Resources

**Render Documentation**: https://render.com/docs  
**Vercel Documentation**: https://vercel.com/docs  
**MongoDB Atlas**: https://www.mongodb.com/docs/atlas/

**Your Configuration Files**:

- Backend: `BACKEND_NODEJS/.env`
- Frontend: `FRONTEND/.env.production`
- Vercel: `FRONTEND/vercel.json`

---

**Deployed by**: [Your Name]  
**Date**: November 2025  
**Project**: InlighnX Fall Risk Assessment Tool
