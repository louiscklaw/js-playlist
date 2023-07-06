const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const Notification = require('../../src/models/notification.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const notificationOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const notificationTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const insertNotifications = async (notifications) => {
  await Notification.insertMany(notifications.map((notification) => ({ ...notification, password: hashedPassword })));
};

module.exports = {
  notificationOne,
  notificationTwo,
  insertNotifications,
};
