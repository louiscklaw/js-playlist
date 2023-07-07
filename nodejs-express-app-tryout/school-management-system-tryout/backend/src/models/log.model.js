const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const logSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

// add plugin that converts mongoose to json
logSchema.plugin(toJSON);
logSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} demo_input - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
logSchema.statics.isEmailTaken = async function (demo_input, excludeUserId) {
  // const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  // return !!user;
  console.log('schema statics method example');
};

/**
 * Check if password matches the user's password
 * @param {string} demo_input
 * @returns {Promise<boolean>}
 */
logSchema.methods.helloworld = async function (demo_input) {
  console.log('schema method helloworld demo');
};

logSchema.pre('save', async function (next) {
  console.log('schema pre save demo');
  // const user = this;
  // if (user.isModified('password')) {
  //   user.password = await bcrypt.hash(user.password, 8);
  // }
  next();
});

/**
 * @typedef Log
 */
const User = mongoose.model('Log', logSchema);

module.exports = User;
