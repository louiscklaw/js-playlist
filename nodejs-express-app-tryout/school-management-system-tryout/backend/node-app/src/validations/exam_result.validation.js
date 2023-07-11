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

const createExamResult = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getExamResults = {
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

const getExamResult = {
  params: Joi.object().keys({
    examResultId: Joi.string().custom(objectId),
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

// frontend/app/src/components/dashboard/examResult/examResult-edit-form.js
const updateExamResult = {
  params: Joi.object().keys({
    examResultId: Joi.required().custom(objectId),
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
    examResultId: Joi.string().custom(objectId),
  }),
};

const deleteExamResult = {
  params: Joi.object().keys({
    examResultId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createExamResult,
  createUser,

  deleteExamResult,
  deleteUser,

  getExamResult,
  getExamResults,
  getUser,

  updateExamResult,
  updateUser,
  updateUserBasicDetail,
};
