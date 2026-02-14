const jwt = require('jsonwebtoken');
const User = require('../models/User');
const TeacherAccountsPool = require('../models/TeacherAccountsPool');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      name,
      email,
      password,
      role: 'student',
    });

    await user.save();

    const token = generateToken(user);
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const teacherLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const teacherAccount = await TeacherAccountsPool.findOne({ username });
    if (!teacherAccount) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare plain text password (as per original requirement)
    if (teacherAccount.password.trim() !== password.trim()) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if account is allocated
    if (!teacherAccount.allocated) {
      return res.status(403).json({ message: 'Account not allocated yet' });
    }

    const user = await User.findById(teacherAccount.allocatedTo);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = generateToken(user);
    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check admin credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME.trim();
    const adminPassword = process.env.ADMIN_PASSWORD.trim();

    if (username.trim() !== adminUsername || password.trim() !== adminPassword) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    // Create a fake admin token
    const adminToken = jwt.sign(
      {
        id: 'admin',
        email: 'admin@tempo.local',
        role: 'admin',
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Admin login successful',
      token: adminToken,
      user: { id: 'admin', email: 'admin@tempo.local', role: 'admin' },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

module.exports = {
  register,
  login,
  teacherLogin,
  adminLogin,
  logout,
};
