# Tempo - Professional Course Marketplace Template

A full-stack, scalable course marketplace template built with Node.js, Express, MongoDB, React, and Vite. Designed for professional online education platforms with role-based access control, pricing management, and secure authentication.

## Features

- **Multi-Role System**: Admin, Teacher, and Student roles with role-based access control
- **Authentication**: JWT + bcrypt secure authentication
- **Course Management**: Teachers can create, upload, manage, and submit courses for approval
- **Pricing System**: Automatic 3% markup calculation on all course prices
- **Student Dashboard**: Browse courses by subject and class, purchase courses, access purchased content
- **Admin Panel**: Manage teachers, students, courses, and allocate teacher accounts
- **Teacher Portal**: Create courses, upload videos, track sales and revenue
- **Professional UI**: Modern, clean design with gradient colors (Blue #1565C0, Yellow #FFD600)
- **Responsive Design**: Mobile-friendly interface
- **3D Logo**: Professional gradient Tempo logo

## Tech Stack

- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React 18 + Vite + React Router
- **Authentication**: JWT + bcryptjs
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Styling**: CSS3 with gradients and animations

## Project Structure

```
tempo-template/
├── server/                 # Backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth & role middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── server.js          # Entry point
│   ├── .env               # Environment variables
│   └── package.json       # Dependencies
│
└── client/                 # Frontend
    ├── src/
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   ├── context/       # Auth context
    │   ├── styles/        # Global styles
    │   ├── App.jsx        # Main app component
    │   └── main.jsx       # Entry point
    ├── index.html         # HTML template
    ├── vite.config.js     # Vite configuration
    └── package.json       # Dependencies
```

## Installation

### Prerequisites
- Node.js v16+ and npm
- MongoDB running locally or connection string
- Git (optional)

### Backend Setup

```bash
cd server
npm install
```

Create or update `.env` file in the server directory:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/tempo
JWT_SECRET=your_secret_key_change_this
ADMIN_USERNAME=arham
ADMIN_PASSWORD=1428
NODE_ENV=development
```

**Admin Credentials**:
- Username: `arham`
- Password: `1428`

### Frontend Setup

```bash
cd client
npm install
```

## Running the Project

### Start MongoDB

```bash
mongod
```

### Start Backend Server

```bash
cd server
npm run dev
```

Server will run on `http://localhost:5000`

### Start Frontend Development Server

In a new terminal:

```bash
cd client
npm run dev
```

Frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Student login
- `POST /api/auth/teacher-login` - Teacher login (using allocated credentials)
- `POST /api/auth/admin-login` - Admin login
- `POST /api/auth/logout` - Logout

### Admin Routes

- `GET /api/admin/teachers` - Get all teachers
- `GET /api/admin/students` - Get all students
- `GET /api/admin/courses` - Get all courses
- `GET /api/admin/teacher-requests` - Get teacher requests
- `PUT /api/admin/teacher-requests/:requestId/approve` - Approve teacher request
- `PUT /api/admin/courses/:id/approve` - Approve course
- `GET /api/admin/teacher-accounts/unallocated` - Get unallocated accounts
- `POST /api/admin/teacher-accounts/create` - Create teacher account
- `POST /api/admin/teacher-accounts/allocate` - Allocate account to teacher

### Teacher Routes

- `POST /api/teacher/courses` - Create course
- `GET /api/teacher/courses` - Get teacher's courses
- `PUT /api/teacher/courses/:courseId` - Update course
- `POST /api/teacher/courses/:courseId/upload-video` - Upload video
- `GET /api/teacher/sales/overview` - Get sales overview

### Student Routes

- `GET /api/student/browse` - Browse all approved courses
- `GET /api/student/subjects` - Get all subjects
- `GET /api/student/classes` - Get all classes
- `GET /api/student/featured` - Get featured courses
- `POST /api/student/course/:courseId/purchase` - Purchase course
- `GET /api/student/purchased-courses` - Get purchased courses
- `GET /api/student/course/:courseId/access` - Access purchased course

## User Roles & Capabilities

### Student
- Register and login
- Browse all approved courses
- Filter courses by subject and class
- Purchase courses
- Access purchased courses
- View course materials and videos

### Teacher
- Login with allocated account credentials
- Create new courses
- Upload course videos
- Set course pricing (with automatic 3% markup)
- Submit courses for approval
- View sales and revenue analytics
- Track student enrollment

### Admin
- Login with admin credentials
- Manage all teachers and their accounts
- Review and approve courses
- Manage student accounts
- Allocate teacher account credentials
- View platform statistics
- Create teacher accounts

## Pricing Logic

The system automatically applies a 3% markup to course prices:

```
Final Price = Base Price × 1.03
```

Example: A course with base price $100 will be sold at $103

This calculation occurs both in:
- Backend when course is created/updated
- Frontend for real-time preview

## Database Models

### User
```
{
  name: String,
  email: String (unique),
  password: String (bcrypt hashed),
  role: 'admin' | 'teacher' | 'student',
  allocatedTeacherAccount: ObjectId (TeacherAccountsPool),
  isActive: Boolean
}
```

### Course
```
{
  teacherId: ObjectId (User),
  title: String,
  description: String,
  subject: String,
  class: String,
  price: Number,
  finalPrice: Number (with 3% markup),
  approved: Boolean,
  videoUrl: String,
  enrolledStudents: [ObjectId],
  totalSales: Number,
  revenue: Number
}
```

### TeacherAccountsPool
```
{
  username: String (unique),
  password: String,
  allocated: Boolean,
  allocatedTo: ObjectId (User)
}
```

## Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Token-based authentication with 7-day expiry
- **Role-Based Access Control**: Middleware enforces role-based route protection
- **Environment Variables**: Sensitive data stored in .env files
- **CORS**: Cross-Origin Resource Sharing configured

## Key Implementation Details

- ✅ Form submissions use `event.preventDefault()` to prevent auto-refresh
- ✅ All async database calls use `await` for proper error handling
- ✅ Password comparison uses `bcrypt.compare()` for security
- ✅ No plain text passwords stored in database
- ✅ All routes validate user role before execution
- ✅ Navbar maintains stable padding and spacing
- ✅ 3% pricing calculation in both frontend and backend
- ✅ Teacher accounts only accessible when `allocated: false`
- ✅ Admin credentials from environment variables with trim() for comparison only

## Future Enhancements

- Email verification and password reset
- Advanced analytics and reporting
- Payment gateway integration (Stripe, PayPal)
- Video streaming with HLS support
- Discussion forums and student interaction
- Certificate generation
- Mobile app versions
- Multi-language support
- Advanced search and recommendations

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check `MONGO_URI` in `.env` file
- Verify MongoDB is accessible on `localhost:27017`

### Admin Login Issues
- Check admin credentials: `arham` / `1428`
- Verify `.env` file has correct `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- Ensure inputs are trimmed correctly

### CORS Issues
- Backend CORS is configured to allow frontend requests
- Ensure frontend is running on `http://localhost:3000`
- Check proxy configuration in `vite.config.js`

### Missing Dependencies
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## License

This template is provided as-is for educational and commercial use.

## Support

For issues or questions, refer to the documentation or check the API endpoints section.

---

**Tempo** - Upgrade Your Learning with Premium Courses
