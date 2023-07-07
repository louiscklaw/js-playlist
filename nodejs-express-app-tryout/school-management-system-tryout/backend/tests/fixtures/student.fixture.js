const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const Student = require('../../src/models/student.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const studentOne = {
  _id: mongoose.Types.ObjectId(),
  name: '1' + '_' + faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'student',
  isEmailVerified: false,
};

const studentTwo = {
  _id: mongoose.Types.ObjectId(),
  name: '2' + "_" + faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'student',
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

const insertStudents = async (students) => {
  await Student.insertMany(students.map((student) => ({ ...student, password: hashedPassword })));
};

module.exports = {
  studentOne,
  studentTwo,
  admin,
  insertStudents,
};
