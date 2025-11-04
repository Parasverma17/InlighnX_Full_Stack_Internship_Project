# MongoDB Atlas Setup & Migration Guide

This guide will help you set up MongoDB Atlas and migrate your data from bundle.json to the cloud database.

## 📋 Prerequisites

- Node.js v14 or higher
- npm v6 or higher
- A MongoDB Atlas account (free tier available)

## 🚀 Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Complete email verification

## 🗄️ Step 2: Create a Database Cluster

1. Click **"Build a Database"** or **"Create"**
2. Choose **FREE** tier (M0 Sandbox - 512MB storage)
3. Select your preferred cloud provider & region (e.g., AWS, us-east-1)
4. Give your cluster a name (e.g., `InlignX-Cluster`)
5. Click **"Create Cluster"** (takes 3-5 minutes to provision)

## 🔐 Step 3: Create Database User

1. In the **Security** section, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Create credentials:
   - Username: `inlignx-admin` (or your choice)
   - Password: Generate a strong password (save it securely!)
5. Set permissions: **"Read and write to any database"**
6. Click **"Add User"**

## 🌐 Step 4: Configure Network Access

1. In the **Security** section, click **"Network Access"**
2. Click **"Add IP Address"**
3. Choose one option:
   - **For development**: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - **For production**: Add your specific IP addresses
4. Click **"Confirm"**

## 🔗 Step 5: Get Connection String

1. Go back to **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as driver (version 4.1 or later)
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## ⚙️ Step 6: Configure Environment Variables

1. Open the `.env` file in `BACKEND_NODEJS` folder
2. Replace the `MONGODB_URI` placeholder with your connection string
3. **IMPORTANT**: Replace `<username>` and `<password>` with your actual credentials

Example:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://inlignx-admin:YourPassword123@cluster0.xxxxx.mongodb.net/inlignx-db?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

**Security Notes**:

- Never commit `.env` to git (already in `.gitignore`)
- Use a strong, unique `SESSION_SECRET` in production
- In production, use specific IP addresses instead of 0.0.0.0/0

## 📦 Step 7: Install Dependencies

Navigate to the backend folder and install new packages:

```bash
cd BACKEND_NODEJS
npm install mongoose dotenv
```

Or install all dependencies:

```bash
npm install
```

## ✅ Step 8: Test MongoDB Connection

Start your server to verify the connection:

```bash
npm start
```

You should see:

```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

If you see errors, check:

- Your connection string format
- Username and password are correct
- Network access is configured
- IP address is whitelisted

## 🔄 Step 9: Migrate Data from bundle.json

Once the connection works, run the migration script:

```bash
npm run migrate
```

The script will:

1. Read all data from `bundle.json`
2. Migrate patients to MongoDB (maintaining all medical data)
3. Migrate assessments (linking them to patient MongoDB IDs)
4. Show progress and summary

Expected output:

```
🚀 Starting data migration from bundle.json to MongoDB...

✅ bundle.json loaded successfully
   - Patients: 5
   - Assessments: 3
   - Users: 2

📦 Migrating patients...
   ✓ Migrated: John Doe (H001)
   ✓ Migrated: Jane Smith (H002)
   ...
✅ Migrated 5 patients

📋 Migrating assessments...
   ✓ Migrated: John Doe (2 assessments)
   ✓ Migrated: Jane Smith (1 assessment)
✅ Migrated 3 patient assessment records

✅ Migration completed successfully!
```

## 🧪 Step 10: Verify Migration

1. **Check MongoDB Atlas Dashboard**:

   - Go to your cluster → Browse Collections
   - You should see:
     - `inlignx-db` database (or your database name)
     - `patients` collection
     - `assessments` collection

2. **Test API Endpoints**:

   Start the backend:

   ```bash
   npm start
   ```

   Test endpoints:

   ```bash
   # Get all patients
   curl http://localhost:5000/patient/list

   # Get specific patient (replace ID with actual MongoDB _id)
   curl http://localhost:5000/patient/info/67a1234567890abcd

   # Check health endpoint
   curl http://localhost:5000/health
   ```

3. **Test Full Application**:
   - Start the frontend: `cd ../FRONTEND && npm start`
   - Navigate to patient selection
   - Select a patient and run an assessment
   - Check results are saved

## 📊 Step 11: View Data in MongoDB Atlas

1. Go to MongoDB Atlas Dashboard
2. Click **"Browse Collections"** on your cluster
3. Explore:
   - **patients** collection: View all patient records with medical data
   - **assessments** collection: View all fall risk assessments

You can search, filter, and export data directly from the dashboard.

## 🔧 Troubleshooting

### Connection Error: "MongoServerError: bad auth"

- Double-check username and password in connection string
- Ensure no special characters need URL encoding
- Recreate database user if needed

### Connection Error: "MongoNetworkError"

- Check your IP address is whitelisted
- Verify network access settings
- Ensure you're not behind a restrictive firewall

### Migration Error: "Patient not found"

- This is normal if assessment references a deleted patient
- The script will skip orphaned assessments

### Duplicate Key Error

- You may have run migration twice
- Clear collections in Atlas and re-run, OR
- Comment out the `deleteMany()` lines in migration script

## 🧹 Step 12: Cleanup (Optional)

Once you've verified everything works:

1. **Backup bundle.json**:

   ```bash
   cd ..
   cp bundle.json bundle.json.backup
   ```

2. **Optional**: Keep bundle.json for local development or remove it

## 🌟 What's Changed?

### Code Changes Made:

1. ✅ Created Mongoose models (`Patient`, `Assessment`)
2. ✅ Added database connection handler
3. ✅ Updated `server.js` with MongoDB integration
4. ✅ Migrated `patient.js` routes to MongoDB
5. ✅ Migrated `assessment.js` routes to MongoDB
6. ✅ Added environment variable support
7. ✅ Created data migration script

### Benefits:

- ☁️ **Cloud-hosted**: Data accessible from anywhere
- 🚀 **Scalable**: Ready for production deployment (Vercel/Render)
- 🔒 **Secure**: Authentication, encryption at rest
- 📊 **Queryable**: Powerful MongoDB queries and indexes
- 💾 **Persistent**: No more file-based storage limitations
- 🔄 **Real-time**: Multiple instances can share data

## 📚 Next Steps

### For Development:

- Start backend: `npm start`
- Start frontend: `cd ../FRONTEND && npm start`
- Everything should work exactly as before!

### For Deployment:

- Follow the deployment guide in the main README
- Deploy frontend to Vercel
- Deploy backend to Render
- Both will connect to MongoDB Atlas

## 🆘 Need Help?

- MongoDB Atlas Docs: https://www.mongodb.com/docs/atlas/
- Mongoose Docs: https://mongoosejs.com/docs/
- Connection String Format: https://www.mongodb.com/docs/manual/reference/connection-string/

## 🎉 Success Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster provisioned
- [ ] Database user created
- [ ] Network access configured
- [ ] Connection string added to `.env`
- [ ] Dependencies installed (`mongoose`, `dotenv`)
- [ ] Server starts successfully with MongoDB connection
- [ ] Migration script run successfully
- [ ] Data visible in MongoDB Atlas dashboard
- [ ] API endpoints working with new database
- [ ] Frontend can select patients and submit assessments

---

**Congratulations!** Your InlignX application is now powered by MongoDB Atlas and ready for cloud deployment! 🚀
