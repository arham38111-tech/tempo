const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const {
  addCourse,
  getTeacherCourses,
  updateCourse,
  uploadVideo,
  submitForApproval,
  getCourseSales,
  getCourseDetails,
} = require('../controllers/teacherController');

// Apply auth and role middleware
router.use(authMiddleware, roleMiddleware(['teacher']));

// Course Management
router.post('/courses', addCourse);
router.get('/courses', getTeacherCourses);
router.put('/courses/:courseId', updateCourse);
router.get('/courses/:courseId', getCourseDetails);

// Video Upload
router.post('/courses/:courseId/upload-video', uploadVideo);

// Submit for Approval
router.post('/courses/:courseId/submit-approval', submitForApproval);

// Sales & Revenue
router.get('/sales/overview', getCourseSales);

module.exports = router;
