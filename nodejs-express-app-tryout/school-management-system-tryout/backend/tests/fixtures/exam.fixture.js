const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const Exam = require('../../src/models/exam.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const examOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const examTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const insertExams = async (exams) => {
  await Exam
    .insertMany(exams.map((exam) => ({ ...exam, password: hashedPassword })));
};

module.exports = {
  examOne,
  examTwo,
  insertExams,
};
