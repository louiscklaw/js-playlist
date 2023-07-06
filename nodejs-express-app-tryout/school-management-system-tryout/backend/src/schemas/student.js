// BOOKMARK: Student schema

const mongoose = require('mongoose');
const validator = require('validator');

// const { roles } = require('../config/roles');
// const { chargingPlan } = require('../config/chargingPlan');

module.exports = mongoose.Schema({
  avatar: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  currency: { type: String, required: true, trim: true },
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
  hasAcceptedMarketing: { type: Boolean, required: true, trim: true, default: true },
  isProspect: { type: Boolean, required: true, trim: true, default: false },
  isReturning: { type: Boolean, required: true, trim: true, default: false },
  name: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  totalAmountSpent: { type: Number, required: true, trim: true },
  totalOrders: { type: Number, required: true, trim: true },
});
