const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const Attendance = require('../../src/models/attendance.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const attendanceOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const attendanceTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const insertAttendances = async (attendances) => {
  await Attendance.insertMany(attendances.map((attendance) => ({ ...attendance, password: hashedPassword })));
};

module.exports = {
  attendanceOne,
  attendanceTwo,
  insertAttendances,
};
