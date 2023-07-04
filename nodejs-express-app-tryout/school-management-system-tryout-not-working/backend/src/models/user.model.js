const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const { roles } = require('../config/roles');
const { chargingPlan } = require('../config/chargingPlan');

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, },
    avatar: { type: String, required: true, trim: true, },
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
    role: { type: String, enum: roles, default: 'user', },
    contentInfoPublic: { type: String, default: 'yes', },
    availableToHire: { type: String, default: 'yes', },
    chargingPlan: { type: String, enum: chargingPlan, default: 'startup', },
    isEmailVerified: { type: Boolean, default: false, },
  },
  { timestamps: true, }
);


// TODO: remove me
// const userSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true, },
//     avatar: { type: String, required: true, trim: true, },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       validate(value) {
//         if (!validator.isEmail(value)) {
//           throw new Error('Invalid email');
//         }
//       },
//     },
//     password: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 8,
//       validate(value) {
//         if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
//           throw new Error('Password must contain at least one letter and one number');
//         }
//       },
//       private: true, // used by the toJSON plugin
//     },
//     role: { type: String, enum: roles, default: 'user', },
//     contentInfoPublic: { type: String, default: 'yes', },
//     availableToHire: { type: String, default: 'yes', },
//     chargingPlan: { type: String, enum: chargingPlan, default: 'startup', },
//     isEmailVerified: { type: Boolean, default: false, },
//   },
//   { timestamps: true, }
// );

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  // const password1 = await bcrypt.hash('password', 8);
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;