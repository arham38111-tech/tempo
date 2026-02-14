# Tempo Template - Quick Start Guide

## 🚀 Quick Start (5 minutes)

### 1. Start MongoDB
```bash
mongod
```
Make sure MongoDB is running on `localhost:27017`

### 2. Start Backend
```bash
cd tempo-template/server
npm run dev
```
Backend runs on `http://localhost:5000`

### 3. Start Frontend (in new terminal)
```bash
cd tempo-template/client
npm run dev
```
Frontend runs on `http://localhost:3000`

## 🔐 Login Credentials

### Admin Login
- **Username**: arham
- **Password**: 1428

### Teacher Login
Use any of these allocated credentials:
- **Username**: teacher1, **Password**: teacher123
- **Username**: teacher2, **Password**: teacher456
- **Username**: teacher3, **Password**: teacher789
- **Username**: teacher4, **Password**: teacherABC
- **Username**: teacher5, **Password**: teacherDEF

### Student
- Register a new account from the login modal
- Or use test credentials if created

---

## Project Features

### ✅ Complete Features Implemented
- [x] Multi-role authentication (Admin, Teacher, Student)
- [x] Secure JWT + bcrypt authentication
- [x] Role-based access control
- [x] Admin dashboard with full management
- [x] Teacher portal with course management
- [x] Student dashboard with course browsing and purchasing
- [x] 3% pricing markup calculation
- [x] Professional UI with modern colors
- [x] Responsive mobile-friendly design
- [x] MongoDB database integration
- [x] CORS enabled for frontend-backend communication
- [x] Form validation and error handling
- [x] Professional 3D gradient Tempo logo
- [x] Framer Motion animations
- [x] React Router navigation

---

## 📁 Key Files

### Backend
- `server/server.js` - Main server entry point
- `server/.env` - Environment configuration (IMPORTANT!)
- `server/config/db.js` - MongoDB connection
- `server/middleware/auth.js` - JWT authentication
- `server/middleware/role.js` - Role-based access control
- `server/controllers/` - Business logic for all routes
- `server/models/` - MongoDB schemas

### Frontend
- `client/src/App.jsx` - Main app with routing
- `client/src/context/AuthContext.jsx` - Authentication state
- `client/src/pages/` - Dashboard pages
- `client/src/components/` - Reusable components
- `client/src/styles/global.css` - Global styling

---

## 🔧 Configuration

### Backend .env File
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tempo
JWT_SECRET=your_secret_key_change_this
ADMIN_USERNAME=arham
ADMIN_PASSWORD=1428
NODE_ENV=development
```

### Important Notes
- ⚠️ Change `JWT_SECRET` to a strong random string in production
- ⚠️ Change `ADMIN_PASSWORD` to a secure password
- ⚠️ Update `MONGO_URI` if using remote MongoDB

---

## 🎯 To Complete These Common Tasks

### Create a New Course (as Teacher)
1. Login as Teacher
2. Go to "Add Course" tab
3. Fill in title, description, subject, class, and price
4. Submit for approval
5. Admin approves the course

### Purchase a Course (as Student)
1. Login as Student
2. Browse courses or use filters
3. Click "Enroll" button
4. Course is added to your purchased courses

### Allocate Teacher Account (as Admin)
1. Login as Admin
2. Go to "Accounts" tab
3. Create new account or use existing unallocated accounts
4. Allocate account to teacher

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Start MongoDB: `mongod`
- Check connection string in `.env`
- Verify MongoDB is running on port 27017

### "Invalid admin credentials"
- Check `.env` file for correct credentials
- Admin username should be: `arham`
- Admin password should be: `1428`
- Clear browser cache and try again

### "Port already in use"
- Backend: Change PORT in `.env` file
- Frontend: Update Vite config or use different port
- Or kill existing process on the port

### "CORS errors"
- Ensure backend is running on `http://localhost:5000`
- Ensure frontend is running on `http://localhost:3000`
- Check CORS configuration in server.js

---

## 📊 Database

Initial setup creates:
- 1 Admin user
- 5 unallocated teacher accounts
- Empty courses and students collections

**Collections Created**:
- `users` - All user accounts
- `courses` - All courses
- `teacheraccountspools` - Teacher login credentials
- `teacherrequests` - Teacher approval requests

---

## 🎨 Branding & Colors

- **Primary Blue**: #1565C0
- **Accent Yellow**: #FFD600
- **White Background**: #FFFFFF
- **Text Color**: #333333
- **Light Gray**: #f5f5f5

All colors are used consistently throughout the UI.

---

## 📱 Responsive Design

The application is fully responsive:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

---

## 🚀 Production Deployment

Before deploying to production:

1. Change sensitive credentials in `.env`
2. Set `NODE_ENV=production`
3. Build frontend: `npm run build`
4. Use environment-specific variables
5. Set up proper MongoDB instance
6. Configure HTTPS/SSL
7. Update API endpoints to production URLs
8. Set up proper error logging

---

## 📞 Command Reference

```bash
# Backend
cd server
npm run dev          # Start dev server with nodemon
npm start            # Start production server
npm test             # Run tests (if configured)

# Frontend
cd client
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## ✨ Next Steps

1. ✅ Customize branding and logo
2. ✅ Update admin credentials
3. ✅ Configure database connection
4. ✅ Add custom course categories
5. ✅ Integrate payment gateway
6. ✅ Set up email notifications
7. ✅ Configure cloud storage for videos
8. ✅ Deploy to production

---

This template is production-ready and scalable. Customize it as needed for your platform!
