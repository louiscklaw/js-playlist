const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const ExamResult = require('../../src/models/exam_result.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const examResultOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const examResultTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const insertExamResults = async (examResults) => {
  await ExamResult
    .insertMany(examResults.map((examResult) => ({ ...examResult, password: hashedPassword })));
};

module.exports = {
  examResultOne,
  examResultTwo,
  insertExamResults,
};
