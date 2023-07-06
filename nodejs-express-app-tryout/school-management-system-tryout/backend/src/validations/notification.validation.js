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

const createNotification = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getNotifications = {
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

const getNotification = {
  params: Joi.object().keys({
    notificationId: Joi.string().custom(objectId),
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

// frontend/app/src/components/dashboard/notification/notification-edit-form.js
const updateNotification = {
  params: Joi.object().keys({
    notificationId: Joi.required().custom(objectId),
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
    notificationId: Joi.string().custom(objectId),
  }),
};

const deleteNotification = {
  params: Joi.object().keys({
    notificationId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createNotification,
  createUser,

  deleteNotification,
  deleteUser,

  getNotification,
  getNotifications,
  getUser,

  updateNotification,
  updateUser,
  updateUserBasicDetail,
};
