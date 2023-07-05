const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const Subject = require('../../src/models/subject.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const subjectOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const subjectTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const insertSubjects = async (subjects) => {
  await Subject
    .insertMany(subjects.map((subject) => ({ ...subject, password: hashedPassword })));
};

module.exports = {
  subjectOne,
  subjectTwo,
  insertSubjects,
};
