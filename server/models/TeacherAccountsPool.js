const mongoose = require('mongoose');

const teacherAccountsPoolSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    allocated: {
      type: Boolean,
      default: false,
    },
    allocatedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeacherAccountsPool', teacherAccountsPoolSchema);
