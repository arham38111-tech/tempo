const Course = require('../models/Course');
const User = require('../models/User');

// Browse all approved courses
const browseCourses = async (req, res) => {
  try {
    const { subject, class: courseClass, search } = req.query;

    let filter = { approved: true };

    if (subject) {
      filter.subject = subject;
    }

    if (courseClass) {
      filter.class = courseClass;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const courses = await Course.find(filter)
      .populate('teacherId', 'name email')
      .select('-videoUrl');

    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subjects (categories)
const getSubjects = async (req, res) => {
  try {
    const subjects = await Course.distinct('subject', { approved: true });
    res.json({ subjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all classes
const getClasses = async (req, res) => {
  try {
    const classes = await Course.distinct('class', { approved: true });
    res.json({ classes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get featured courses
const getFeaturedCourses = async (req, res) => {
  try {
    const featured = await Course.find({ approved: true })
      .populate('teacherId', 'name email')
      .sort({ totalSales: -1 })
      .limit(6)
      .select('-videoUrl');

    res.json({ featured });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course details
const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate('teacherId', 'name email');

    if (!course || !course.approved) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Purchase course
const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!course.approved) {
      return res.status(400).json({ message: 'Course is not approved' });
    }

    // Check if student already enrolled
    if (course.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ message: 'You already own this course' });
    }

    // Add student to enrolled list
    course.enrolledStudents.push(studentId);
    course.totalSales += 1;
    course.revenue += course.finalPrice;

    await course.save();

    res.json({
      message: 'Course purchased successfully',
      totalPrice: course.finalPrice,
      course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get purchased courses
const getPurchasedCourses = async (req, res) => {
  try {
    const studentId = req.user.id;

    const courses = await Course.find({
      enrolledStudents: studentId,
      approved: true,
    }).populate('teacherId', 'name email');

    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Access course (with video)
const accessCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if student has access
    if (!course.enrolledStudents.includes(studentId)) {
      return res.status(403).json({ message: 'You do not have access to this course' });
    }

    res.json({ course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  browseCourses,
  getSubjects,
  getClasses,
  getFeaturedCourses,
  getCourseDetails,
  purchaseCourse,
  getPurchasedCourses,
  accessCourse,
};
