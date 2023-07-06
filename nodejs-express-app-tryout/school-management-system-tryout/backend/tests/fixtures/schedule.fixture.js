const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const Schedule = require('../../src/models/schedule.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const scheduleOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const scheduleTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const insertSchedules = async (schedules) => {
  await Schedule.insertMany(schedules.map((schedule) => ({ ...schedule, password: hashedPassword })));
};

module.exports = {
  scheduleOne,
  scheduleTwo,
  insertSchedules,
};
