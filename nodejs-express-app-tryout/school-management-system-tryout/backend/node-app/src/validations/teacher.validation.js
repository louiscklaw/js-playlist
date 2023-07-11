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

const createTeacher = {
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

const getTeachers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getTeacher = {
  params: Joi.object().keys({
    teacherId: Joi.string().custom(objectId),
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
const updateTeacher = {
  params: Joi.object().keys({
    teacherId: Joi.required().custom(objectId),
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

const deleteTeacher = {
  params: Joi.object().keys({
    teacherId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createUser,
  getTeachers,
  getUser,
  updateUser,
  deleteUser,
  updateUserBasicDetail,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  createTeacher,
};
