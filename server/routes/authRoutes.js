const express = require('express');
const router = express.Router();
const {
  register,
  login,
  teacherLogin,
  adminLogin,
  logout,
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/teacher-login', teacherLogin);
router.post('/admin-login', adminLogin);
router.post('/logout', logout);

module.exports = router;
