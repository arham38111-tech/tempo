require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const TeacherAccountsPool = require('../models/TeacherAccountsPool');

// Initialize admin user and sample teacher accounts
async function setupInitialData() {
  try {
    console.log('Starting initial data setup...');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@tempo.local' }).catch(() => null);
    if (!adminExists) {
      const admin = new User({
        name: 'Tempo Admin',
        email: 'admin@tempo.local',
        password: 'temporaryPassword123',
        role: 'admin',
      });
      await admin.save();
      console.log('✓ Admin user created');
    } else {
      console.log('✓ Admin user already exists');
    }

    // Create sample teacher accounts
    const existingAccounts = await TeacherAccountsPool.countDocuments().catch(() => 0);
    if (existingAccounts === 0) {
      const sampleAccounts = [
        { username: 'teacher1', password: 'teacher123', allocated: false },
        { username: 'teacher2', password: 'teacher456', allocated: false },
        { username: 'teacher3', password: 'teacher789', allocated: false },
        { username: 'teacher4', password: 'teacherABC', allocated: false },
        { username: 'teacher5', password: 'teacherDEF', allocated: false },
      ];

      await TeacherAccountsPool.insertMany(sampleAccounts);
      console.log('✓ Sample teacher accounts created');
    } else {
      console.log('✓ Teacher accounts already exist');
    }

    console.log('Initial data setup completed successfully');
  } catch (error) {
    console.warn('Warning during initial setup (MongoDB may not be ready):', error.message);
    console.log('Server will continue running. Database will be initialized when MongoDB is available.');
  }
}

module.exports = setupInitialData;
