# 🎉 Getting Started with Tempo - Step by Step

Welcome to the Tempo course marketplace template! This guide will walk you through setup and first run in 10 minutes.

---

## ✅ Prerequisites

Before you start, install these:

1. **Node.js & npm** - Download from https://nodejs.org/
   - Choose "LTS" version
   - This includes npm automatically

2. **MongoDB** - Two options:
   - **Option A (Easiest)**: Create free account at https://www.mongodb.com/cloud/atlas
   - **Option B (Local)**: Download from https://www.mongodb.com/try/download/community

Verify installation:
```bash
node --version        # Should show v16+
npm --version         # Should show v8+
mongod --version      # Should show version number
```

---

## 🚀 Quick Setup (10 minutes)

### Step 1: Navigate to Project

```bash
cd c:\Users\Waqas\Desktop\tempo\tempo-template
```

### Step 2: Start MongoDB

**If using Local MongoDB:**
```bash
# Windows
mongod
# Keep this terminal open!
```

**If using MongoDB Atlas:**
- Skip this step, you'll use cloud connection in .env

### Step 3: Start Backend Server

Open a **new terminal** and run:

```bash
cd c:\Users\Waqas\Desktop\tempo\tempo-template\server
npm run dev
```

You should see:
```
Server running on http://localhost:5000
MongoDB connected successfully
Initial data setup completed successfully
```

### Step 4: Start Frontend

Open a **third terminal** and run:

```bash
cd c:\Users\Waqas\Desktop\tempo\tempo-template\client
npm run dev
```

You should see:
```
VITE v4.0.0  ready in XXX ms

➜  Local:   http://localhost:3000/
```

### Step 5: Open in Browser

Go to: **http://localhost:3000**

You should see the Tempo homepage with "Upgrade Your Learning with Premium Courses"

---

## 🔐 First Login

### Admin Login

1. Click "Login" button in navbar
2. Go to "Admin" tab
3. Enter credentials:
   - Username: `arham`
   - Password: `1428`
4. Click "Login as Admin"

You'll see the Admin Dashboard!

### Teacher Login

1. Click "Login" button
2. Go to "Teacher" tab
3. Use any of these credentials:
   - Username: `teacher1`, Password: `teacher123`
   - Username: `teacher2`, Password: `teacher456`
4. Click "Login as Teacher"

You'll see the Teacher Dashboard!

### Student Login

1. Click "Login" button
2. Go to "Student" tab
3. Click "Create one" to register
4. Fill in:
   - Full Name: Your name
   - Email: anything@example.com
   - Password: any password
5. Click "Create Account"

You'll see the Student Dashboard!

---

## 📝 Try These Features

### As Admin
1. Go to "Teachers" tab → See table of teachers
2. Go to "Courses" tab → See all courses
3. Go to "Accounts" tab → Create a new teacher account
4. Go to "Students" tab → See all registered students

### As Teacher
1. Click "Add Course" tab
2. Fill in:
   - Title: "Learn Python"
   - Description: "Complete Python guide"
   - Subject: "Programming"
   - Class: "Beginner"
   - Price: "49.99"
3. Click "Create Course"
4. See final price calculated (49.99 × 1.03 = 51.49)
5. Go to "My Courses" to see it

### As Student
1. Click "Browse Courses" tab
2. Use filters to search
3. Click "Enroll" button on a course
4. Go to "My Courses" to see purchased courses

---

## 📁 Project Structure Overview

```
tempo-template/
│
├── server/                 ← Backend (Node.js + MongoDB)
│   ├── models/            ← Database schemas
│   ├── controllers/       ← Business logic
│   ├── routes/            ← API endpoints
│   ├── middleware/        ← Auth & role protection
│   ├── .env               ← Configuration
│   └── server.js          ← Main server file
│
├── client/                 ← Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/         ← Dashboards (Admin, Teacher, Student)
│   │   ├── components/    ← Navbar, Logo, Hero, LoginModal
│   │   ├── context/       ← Authentication state
│   │   └── styles/        ← Global CSS with colors
│   └── index.html         ← HTML entry point
│
└── README.md              ← Full documentation
```

---

## 🐛 Troubleshooting

### "Cannot start backend - MongoDB connection failed"

**Problem**: Backend can't connect to MongoDB

**Solutions**:
1. **If using local MongoDB**:
   - Make sure `mongod` is running in a terminal
   - Check it's running on port 27017

2. **If using MongoDB Atlas**:
   - Check `.env` file has correct MONGO_URI
   - Verify connection string has correct password
   - Check IP whitelist allows your computer

3. **Test connection**:
   ```bash
   mongo
   # or for newer versions
   mongosh
   ```

---

### "Frontend won't load - API connection error"

**Problem**: Frontend can't connect to backend

**Solution**:
1. Verify backend is running on port 5000
2. Check terminal shows "Server running on http://localhost:5000"
3. Refresh browser (Ctrl+R or Cmd+R)

---

### "Admin login not working"

**Problem**: Admin credentials not accepted

**Solutions**:
1. Check `.env` file:
   ```bash
   cat server\.env
   ```
   Should show:
   ```
   ADMIN_USERNAME=arham
   ADMIN_PASSWORD=1428
   ```

2. Restart backend server (Ctrl+C, then `npm run dev`)

3. Clear browser cache and try again

---

### "Port already in use"

**Problem**: Error about port 5000 or 3000 already in use

**Solution**:
- Change port in `.env`:
  ```
  PORT=5001
  ```
- Then restart backend

---

## 🔧 Common Tasks

### Change Admin Password

1. Open `server/.env`
2. Find line: `ADMIN_PASSWORD=1428`
3. Change to: `ADMIN_PASSWORD=your_new_password`
4. Save file
5. Restart backend server

### Create Sample Courses

As a teacher:
1. Login as teacher
2. Click "Add Course"
3. Fill in all fields
4. Click "Create Course"

As admin:
1. Go to "Courses" tab
2. Find pending course
3. Click "Approve"

### Test Course Purchase

As a student:
1. Login or register
2. Click "Browse Courses"
3. Click "Enroll" on any approved course
4. Go to "My Courses" to see it

---

## 📚 Documentation Files

For more detailed information, read:

| File | Purpose |
|------|---------|
| **QUICKSTART.md** | 5-minute quick reference |
| **README.md** | Complete documentation |
| **DEPLOYMENT.md** | How to deploy to production |
| **PROJECT_SUMMARY.md** | Full feature list and technical details |
| **FILE_MANIFEST.md** | List of all files created |

---

## 💡 Tips

1. **Keep Three Terminals Open**:
   - MongoDB (if local)
   - Backend server
   - Frontend server

2. **Check Logs**:
   - Backend logs show in terminal with `npm run dev`
   - Frontend logs show in browser console (F12)

3. **Test with Different Roles**:
   - Open 3 browser windows/tabs
   - Login as Admin, Teacher, Student
   - Test features for each role

4. **Data Persists**:
   - Courses you create are saved in MongoDB
   - Data persists even after restart

---

## ✨ Next Steps

Once you're comfortable with the basics:

1. **Customize Branding**:
   - Change logo colors in `client/src/components/Logo.jsx`
   - Update colors in `client/src/styles/global.css`

2. **Add Features**:
   - Create new routes in `server/routes/`
   - Make new API endpoints
   - Build new React components

3. **Deploy**:
   - Follow `DEPLOYMENT.md` guide
   - Deploy to Heroku, AWS, or other platforms

4. **Integrate Payments**:
   - Add Stripe or PayPal integration
   - Process real payments for courses

---

## 🎯 Common Next Questions

### "Where are courses stored?"
In MongoDB database, `courses` collection

### "Can I change the theme colors?"
Yes! Edit `client/src/styles/global.css`, change CSS color variables

### "How do I add more features?"
Create new files in controllers/routes, then create React components for UI

### "Can I use a different database?"
Yes, but you'd need to rewrite models from MongoDB to your database

### "How do I deploy?"
See `DEPLOYMENT.md` file for step-by-step instructions

---

## 🎓 Learning Resources

- **Express.js**: https://expressjs.com
- **MongoDB**: https://docs.mongodb.com
- **React**: https://react.dev
- **Vite**: https://vitejs.dev

---

## 💬 Getting Help

1. Check error messages in terminal carefully
2. Search documentation files (README.md, QUICKSTART.md)
3. Review console logs (F12 in browser)
4. Check `.env` configuration

---

## 🎉 You're Ready!

Congratulations! You now have a fully functional course marketplace running locally.

Next: Read **QUICKSTART.md** for quick reference, or **README.md** for complete details.

Happy coding! 🚀

---

**Tempo Template v1.0**
Professional Course Marketplace
