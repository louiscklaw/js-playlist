const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

// NOTE: related to these files:
// frontend/app/src/components/dashboard/student/student-edit-form.js
// backend/src/validations/student.validation.js
const studentSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address1: { type: String, required: false, trim: true, default: '' },
    address2: { type: String, required: false, trim: true, default: '' },
    country: { type: String, required: false, trim: true, default: '' },
    phone: { type: String, required: false, trim: true, default: '' },
    state: { type: String, required: false, trim: true, default: '' },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },

    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    isEmailVerified: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    hasDiscount: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
studentSchema.plugin(toJSON);
studentSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
studentSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
studentSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

studentSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef Student
 */
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
