const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const createStudent = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
    address1: Joi.string().allow(''),
    address2: Joi.string().allow(''),
    country: Joi.string().allow(''),
    hasDiscount: Joi.boolean(),
    isVerified: Joi.boolean(),
    phone: Joi.string().allow(''),
    state: Joi.string(),
  }),
};

const getStudents = {
  query: Joi.object().keys({
    // options
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),

    // filters
    studentName: Joi.string(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

// frontend/app/src/components/dashboard/student/student-edit-form.js
const updateStudent = {
  params: Joi.object().keys({
    studentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      // password: Joi.string().custom(password),
      name: Joi.string(),
      address1: Joi.string().allow(''),
      address2: Joi.string().allow(''),
      country: Joi.string().allow(''),
      hasDiscount: Joi.boolean(),
      isVerified: Joi.boolean(),
      isAcSuspended: Joi.boolean(),
      phone: Joi.string().allow(''),
      state: Joi.string(),
    })
    .min(1),
};

const updateUserBasicDetail = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};

const deleteStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createUser,
  getStudents,
  getUser,
  updateUser,
  deleteUser,
  updateUserBasicDetail,
  getStudent,
  updateStudent,
  deleteStudent,
  createStudent,
};
