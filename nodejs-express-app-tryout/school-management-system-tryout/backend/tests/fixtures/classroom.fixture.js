const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const Classroom = require('../../src/models/classroom.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const classroomOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const classroomTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const insertClassrooms = async (classrooms) => {
  await Classroom
    .insertMany(classrooms.map((classroom) => ({ ...classroom, password: hashedPassword })));
};

module.exports = {
  classroomOne,
  classroomTwo,
  insertClassrooms,
};
