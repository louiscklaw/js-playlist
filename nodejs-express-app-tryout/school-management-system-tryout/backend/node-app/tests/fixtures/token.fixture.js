const moment = require('moment');
const config = require('../../src/config/config');
const { tokenTypes } = require('../../src/config/tokens');
const tokenService = require('../../src/services/token.service');

const { userOne, admin } = require('./user.fixture');
const { studentOne } = require('./student.fixture');
const { teacherOne } = require('./teacher.fixture');

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');

const userOneAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires, tokenTypes.ACCESS);

const adminOneAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires, tokenTypes.ACCESS);

const adminAccessToken = tokenService.generateToken(admin._id, accessTokenExpires, tokenTypes.ACCESS);

const studentOneAccessToken = tokenService.generateToken(studentOne._id, accessTokenExpires, tokenTypes.ACCESS);

const teacherOneAccessToken = tokenService.generateToken(teacherOne._id, accessTokenExpires, tokenTypes.ACCESS);

module.exports = {
  userOneAccessToken,
  adminAccessToken,
  studentOneAccessToken,
  teacherOneAccessToken,
  adminOneAccessToken,
};
