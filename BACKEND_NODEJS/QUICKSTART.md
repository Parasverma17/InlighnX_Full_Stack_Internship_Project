# Quick Start Guide - MongoDB Migration

## 🚀 Get Started in 5 Minutes

### 1. Create MongoDB Atlas Account (2 min)

```
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Click "Build a Database" → Choose FREE tier
4. Select region → Create Cluster (wait 3-5 min)
```

### 2. Create Database User (1 min)

```
1. Security → Database Access → Add New Database User
2. Username: inlignx-admin
3. Password: (Generate strong password, SAVE IT!)
4. Permissions: "Read and write to any database"
5. Add User
```

### 3. Allow Network Access (30 sec)

```
1. Security → Network Access → Add IP Address
2. Click "Allow Access from Anywhere" (for development)
3. Confirm
```

### 4. Get Connection String (30 sec)

```
1. Database → Connect → Connect your application
2. Choose: Node.js driver
3. Copy connection string
```

### 5. Configure Backend (1 min)

Open `BACKEND_NODEJS/.env` and update:

```env
MONGODB_URI=mongodb+srv://inlignx-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/inlignx-db?retryWrites=true&w=majority
SESSION_SECRET=change-this-to-a-random-secret-key-for-production
FRONTEND_URL=http://localhost:3000
```

**IMPORTANT**: Replace `YOUR_PASSWORD` with your actual password!

### 6. Install & Test (1 min)

```bash
cd BACKEND_NODEJS
npm install mongoose dotenv
npm start
```

✅ Should see: `MongoDB connected successfully`

### 7. Migrate Data (30 sec)

```bash
npm run migrate
```

✅ Should see: `Migration completed successfully!`

---

## 🎯 That's It!

Your application now uses MongoDB Atlas instead of bundle.json.

**Test it**:

1. Start backend: `npm start` (in BACKEND_NODEJS)
2. Start frontend: `npm start` (in FRONTEND)
3. Select a patient and run an assessment
4. Check MongoDB Atlas dashboard to see your data!

---

## 📋 Command Reference

```bash
# Start server
npm start

# Start with auto-reload (development)
npm run dev

# Run data migration
npm run migrate

# Run tests
npm test

# Install dependencies
npm install
```

---

## 🔧 Common Issues

### "bad auth" error?

→ Check username/password in .env are correct

### "MongoNetworkError"?

→ Ensure IP address is whitelisted (0.0.0.0/0)

### Migration fails?

→ Make sure server connects first (`npm start`)

### Can't find bundle.json?

→ Migration script looks for it at root level

---

## 📚 Need More Help?

- **Detailed setup**: See `MONGODB_SETUP.md`
- **Change summary**: See `MIGRATION_SUMMARY.md`
- **MongoDB docs**: https://www.mongodb.com/docs/atlas/

---

## ✅ Success Indicators

| Step                   | Success Indicator                   |
| ---------------------- | ----------------------------------- |
| Cluster created        | See cluster name in Atlas dashboard |
| User created           | See username in Database Access     |
| Network configured     | See IP in Network Access            |
| .env configured        | No `<password>` placeholders        |
| Dependencies installed | No error on `npm start`             |
| Connection works       | See "✅ MongoDB connected"          |
| Migration successful   | See "✅ Migration completed"        |
| Data visible           | See collections in Atlas            |

---

**Ready for deployment?** Your backend can now be deployed to Render, and frontend to Vercel! 🚀
