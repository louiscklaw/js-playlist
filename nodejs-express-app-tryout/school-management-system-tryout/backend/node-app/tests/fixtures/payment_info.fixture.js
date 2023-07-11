const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const PaymentInfo = require('../../src/models/payment_info.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const paymentInfoOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const paymentInfoTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const insertPaymentInfos = async (paymentInfos) => {
  await PaymentInfo.insertMany(paymentInfos.map((paymentInfo) => ({ ...paymentInfo, password: hashedPassword })));
};

module.exports = {
  paymentInfoOne,
  paymentInfoTwo,
  insertPaymentInfos,
};
