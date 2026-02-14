const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const {
  getAllTeachers,
  getTeacherById,
  deleteTeacher,
  getTeacherRequests,
  approveTeacherRequest,
  rejectTeacherRequest,
  getAllCourses,
  approveCourse,
  rejectCourse,
  getAllStudents,
  getUnallocatedTeacherAccounts,
  allocateTeacherAccount,
  createTeacherAccount,
  getCategories,
  getClasses,
} = require('../controllers/adminController');

// Apply auth and role middleware
router.use(authMiddleware, roleMiddleware(['admin']));

// Teacher Management
router.get('/teachers', getAllTeachers);
router.get('/teachers/:id', getTeacherById);
router.delete('/teachers/:id', deleteTeacher);

// Teacher Requests
router.get('/teacher-requests', getTeacherRequests);
router.put('/teacher-requests/:requestId/approve', approveTeacherRequest);
router.put('/teacher-requests/:requestId/reject', rejectTeacherRequest);

// Course Management
router.get('/courses', getAllCourses);
router.put('/courses/:id/approve', approveCourse);
router.delete('/courses/:id/reject', rejectCourse);

// Student Management
router.get('/students', getAllStudents);

// Teacher Account Management
router.get('/teacher-accounts/unallocated', getUnallocatedTeacherAccounts);
router.post('/teacher-accounts/create', createTeacherAccount);
router.post('/teacher-accounts/allocate', allocateTeacherAccount);

// Categories
router.get('/categories', getCategories);
router.get('/classes', getClasses);

module.exports = router;
