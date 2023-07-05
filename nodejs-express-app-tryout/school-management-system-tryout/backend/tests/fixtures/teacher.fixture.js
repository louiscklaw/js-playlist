const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const Teacher = require('../../src/models/teacher.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const teacherOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

const teacherTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false,
};

const admin = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'admin',
  isEmailVerified: false,
};

const insertTeachers = async (teachers) => {
  await Teacher.insertMany(teachers.map((teacher) => ({ ...teacher, password: hashedPassword })));
};

module.exports = {
  teacherOne,
  teacherTwo,
  admin,
  insertTeachers,
};
