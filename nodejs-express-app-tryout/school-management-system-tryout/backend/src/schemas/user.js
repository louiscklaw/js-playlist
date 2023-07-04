// BOOKMARK: Define the User schema

const mongoose = require('mongoose');
const validator = require('validator');
const { roles } = require('../config/roles');
const { chargingPlan } = require('../config/chargingPlan');

module.exports = mongoose.Schema({
  name: { type: String, required: true, trim: true, },
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
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error('Password must contain at least one letter and one number');
      }
    },
    private: true, // used by the toJSON plugin
  },
  avatar: { type: String, required: true, trim: true, },
  role: { type: String, enum: roles, default: 'user', },
  contentInfoPublic: { type: String, default: 'yes', },
  availableToHire: { type: String, default: 'yes', },
  chargingPlan: { type: String, enum: chargingPlan, default: 'startup', },
  isEmailVerified: { type: Boolean, default: false, },
});
