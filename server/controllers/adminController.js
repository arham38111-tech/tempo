const User = require('../models/User');
const Course = require('../models/Course');
const TeacherRequest = require('../models/TeacherRequest');
const TeacherAccountsPool = require('../models/TeacherAccountsPool');

// Manage Teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).select('-password');
    res.json({ teachers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id).select('-password');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const teacher = await User.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Teacher Requests
const getTeacherRequests = async (req, res) => {
  try {
    const requests = await TeacherRequest.find().populate('userId', 'name email');
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveTeacherRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await TeacherRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update user role to teacher
    await User.findByIdAndUpdate(request.userId, { role: 'teacher' });

    // Update request status
    request.status = 'approved';
    await request.save();

    res.json({ message: 'Teacher request approved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectTeacherRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await TeacherRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    request.status = 'rejected';
    await request.save();

    res.json({ message: 'Teacher request rejected' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manage Courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacherId', 'name email');
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course approved', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course rejected and deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View Students
const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json({ students });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Allocate Teacher Accounts
const getUnallocatedTeacherAccounts = async (req, res) => {
  try {
    const accounts = await TeacherAccountsPool.find({ allocated: false });
    res.json({ accounts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const allocateTeacherAccount = async (req, res) => {
  try {
    const { accountId, teacherId } = req.body;

    if (!accountId || !teacherId) {
      return res.status(400).json({ message: 'Account ID and Teacher ID are required' });
    }

    const account = await TeacherAccountsPool.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (account.allocated) {
      return res.status(400).json({ message: 'Account already allocated' });
    }

    account.allocated = true;
    account.allocatedTo = teacherId;
    await account.save();

    // Update user with allocated account
    await User.findByIdAndUpdate(teacherId, {
      allocatedTeacherAccount: accountId,
    });

    res.json({ message: 'Teacher account allocated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTeacherAccount = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingAccount = await TeacherAccountsPool.findOne({ username });
    if (existingAccount) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const account = new TeacherAccountsPool({
      username,
      password,
      allocated: false,
    });

    await account.save();
    res.status(201).json({ message: 'Teacher account created', account });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manage Categories/Subjects
const getCategories = async (req, res) => {
  try {
    const categories = await Course.distinct('subject');
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClasses = async (req, res) => {
  try {
    const classes = await Course.distinct('class');
    res.json({ classes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};
