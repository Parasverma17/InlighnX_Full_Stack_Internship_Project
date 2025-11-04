# 🎯 Quick Deployment Steps - InlighnX

## Files Changed & Ready ✅

Your code is now **deployment-ready** with these changes:

### Backend Changes:

- ✅ `server.js` - Updated CORS for production
- ✅ `package.json` - Has Node engine specified
- ✅ `.env` - Environment variables configured

### Frontend Changes:

- ✅ `src/api/frat.js` - Uses environment variable for API URL
- ✅ `.env.production` - Production environment file
- ✅ `.env.local` - Local development environment file
- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `.gitignore` - Protects sensitive files

### New Documentation:

- ✅ `DEPLOYMENT.md` - Full detailed guide
- ✅ `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist

---

## 🚀 Deploy in 3 Simple Steps

### Step 1: Push to GitHub (2 min)

```bash
cd C:\Users\smart\Desktop\InlighnX_Full_Stack_Internship_Project
git add -A
git commit -m "feat: ready for production deployment"
git push origin main
```

### Step 2: Deploy Backend to Render (15 min)

1. Go to https://render.com → Sign up with GitHub
2. New + → Web Service → Connect repository
3. Configure:
   - **Name**: `inlighnx-backend`
   - **Root Directory**: `BACKEND_NODEJS` ⚠️
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add 7 environment variables (see checklist)
5. Create Web Service
6. **Save your URL**: `https://______.onrender.com`

### Step 3: Deploy Frontend to Vercel (10 min)

1. Update `FRONTEND/.env.production` with your backend URL
2. Commit and push: `git push origin main`
3. Go to https://vercel.com → Sign up with GitHub
4. New Project → Import repository
5. Configure:
   - **Root Directory**: `FRONTEND` ⚠️
   - **Environment Variable**:
     - `REACT_APP_API_URL` = your backend URL
6. Deploy
7. Update Render `FRONTEND_URL` with your Vercel URL

---

## 📋 Environment Variables Reference

### Render (Backend)

```env
MONGODB_URI=mongodb+srv://parasverma1710_db_user:HTqmn1FilQXZi8ZY@cluster0.uuzxkqe.mongodb.net/inlighnx?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
NODE_ENV=production
SESSION_SECRET=jNJTo4ze83YFXvGi9EAyqd1QU0fRVwhg
FRONTEND_URL=https://your-frontend.vercel.app
JWT_SECRET=your-jwt-secret-key-change-this
DB_NAME=inlighnx
```

### Vercel (Frontend)

```env
REACT_APP_API_URL=https://your-backend.onrender.com
```

---

## ✅ Testing Checklist

After deployment, test these:

**Backend**:

- [ ] https://your-backend.onrender.com/health returns OK
- [ ] https://your-backend.onrender.com/patient/list returns 10 patients

**Frontend**:

- [ ] https://your-frontend.vercel.app loads
- [ ] Patient selection works
- [ ] Assessment submission works
- [ ] No CORS errors (check browser console F12)

---

## 📁 Important Files

**Open these when deploying**:

1. **DEPLOYMENT_CHECKLIST.md** - Follow step-by-step
2. **DEPLOYMENT.md** - Detailed instructions
3. **BACKEND_NODEJS/.env** - Environment variables reference
4. **FRONTEND/.env.production** - Update with backend URL

---

## 🎉 Success Indicators

✅ Backend Status: "Live" (green badge in Render)  
✅ Frontend Status: "Ready" (in Vercel)  
✅ Health check returns: `{"status": "OK"}`  
✅ Patient list loads in browser  
✅ Assessment submission works

---

## 💡 Pro Tips

1. **Backend URL First**: Deploy backend first, save URL, then deploy frontend
2. **Root Directory**: MUST set correctly! `BACKEND_NODEJS` and `FRONTEND`
3. **Environment Variables**: Copy-paste carefully, no typos
4. **CORS Update**: Update Render `FRONTEND_URL` after getting Vercel URL
5. **Free Tier**: Backend sleeps after 15 min (30-60 sec first request)

---

## 🆘 Quick Fixes

**CORS Error**: Update `FRONTEND_URL` in Render, redeploy  
**Build Failed**: Check root directory is set correctly  
**API Not Working**: Verify `REACT_APP_API_URL` in Vercel  
**Blank Page**: Check browser console (F12) for errors

---

## 📞 Need Help?

1. Check **DEPLOYMENT_CHECKLIST.md** for step-by-step guide
2. See **DEPLOYMENT.md** for troubleshooting
3. Open browser console (F12) to see actual errors
4. Check Render/Vercel logs for detailed error messages

---

**Time Required**: ~30 minutes  
**Cost**: $0/month (all free tiers)  
**Difficulty**: ⭐⭐☆☆☆ (Beginner-friendly)

🚀 **You're ready to deploy!** Open `DEPLOYMENT_CHECKLIST.md` and start!
