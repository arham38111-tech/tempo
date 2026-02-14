const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');
const {
  browseCourses,
  getSubjects,
  getClasses,
  getFeaturedCourses,
  getCourseDetails,
  purchaseCourse,
  getPurchasedCourses,
  accessCourse,
} = require('../controllers/studentController');

// Public routes (no auth required for browsing)
router.get('/browse', browseCourses);
router.get('/subjects', getSubjects);
router.get('/classes', getClasses);
router.get('/featured', getFeaturedCourses);
router.get('/course/:courseId', getCourseDetails);

// Protected routes (auth required)
router.use(authMiddleware, roleMiddleware(['student']));

router.post('/course/:courseId/purchase', purchaseCourse);
router.get('/purchased-courses', getPurchasedCourses);
router.get('/course/:courseId/access', accessCourse);

module.exports = router;
