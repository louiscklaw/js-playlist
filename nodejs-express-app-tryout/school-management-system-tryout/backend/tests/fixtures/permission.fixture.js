const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const Permission = require('../../src/models/permission.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const permissionOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const permissionTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const insertPermissions = async (permissions) => {
  await Permission.insertMany(permissions.map((permission) => ({ ...permission, password: hashedPassword })));
};

module.exports = {
  permissionOne,
  permissionTwo,
  insertPermissions,
};
