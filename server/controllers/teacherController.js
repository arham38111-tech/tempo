const Course = require('../models/Course');
const User = require('../models/User');

// Calculate final price with 3% markup
const calculateFinalPrice = (basePrice) => {
  return parseFloat((basePrice * 1.03).toFixed(2));
};

// Add Course
const addCourse = async (req, res) => {
  try {
    const { title, description, subject, class: courseClass, price } = req.body;
    const teacherId = req.user.id;

    if (!title || !description || !subject || !courseClass || price === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (price < 0) {
      return res.status(400).json({ message: 'Price cannot be negative' });
    }

    const finalPrice = calculateFinalPrice(price);

    const course = new Course({
      teacherId,
      title,
      description,
      subject,
      class: courseClass,
      price,
      finalPrice,
      approved: false,
    });

    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Teacher Courses
const getTeacherCourses = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const courses = await Course.find({ teacherId }).populate('enrolledStudents', 'name email');
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Course
const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, subject, class: courseClass, price } = req.body;
    const teacherId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.teacherId.toString() !== teacherId) {
      return res.status(403).json({ message: 'You can only update your own courses' });
    }

    if (title) course.title = title;
    if (description) course.description = description;
    if (subject) course.subject = subject;
    if (courseClass) course.class = courseClass;
    if (price !== undefined) {
      if (price < 0) {
        return res.status(400).json({ message: 'Price cannot be negative' });
      }
      course.price = price;
      course.finalPrice = calculateFinalPrice(price);
    }

    await course.save();
    res.json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload Video
const uploadVideo = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { videoUrl } = req.body;
    const teacherId = req.user.id;

    if (!videoUrl) {
      return res.status(400).json({ message: 'Video URL is required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.teacherId.toString() !== teacherId) {
      return res.status(403).json({ message: 'You can only update your own courses' });
    }

    course.videoUrl = videoUrl;
    await course.save();
    res.json({ message: 'Video uploaded successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Submit for Approval
const submitForApproval = async (req, res) => {
  try {
    const { courseId } = req.params;
    const teacherId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.teacherId.toString() !== teacherId) {
      return res.status(403).json({ message: 'You can only submit your own courses' });
    }

    // Course is now pending approval (admin will approve it)
    res.json({ message: 'Course submitted for approval', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View Sales
const getCourseSales = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const courses = await Course.find({ teacherId }).select(
      'title totalSales revenue price finalPrice enrolledStudents'
    );

    const totalRevenue = courses.reduce((sum, course) => sum + (course.revenue || 0), 0);
    const totalSales = courses.reduce((sum, course) => sum + (course.totalSales || 0), 0);

    res.json({
      courses,
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      totalSales,
      courseCount: courses.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Course Details
const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId)
      .populate('teacherId', 'name email')
      .populate('enrolledStudents', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCourse,
  getTeacherCourses,
  updateCourse,
  uploadVideo,
  submitForApproval,
  getCourseSales,
  getCourseDetails,
};
