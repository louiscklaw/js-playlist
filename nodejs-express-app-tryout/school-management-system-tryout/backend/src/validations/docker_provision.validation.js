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

const createDockerProvision = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getDockerProvisions = {
  query: Joi.object().keys({
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

const getDockerProvision = {
  params: Joi.object().keys({
    dockerProvisionId: Joi.string().custom(objectId),
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

// frontend/app/src/components/dashboard/dockerProvision/dockerProvision-edit-form.js
const updateDockerProvision = {
  params: Joi.object().keys({
    dockerProvisionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
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
    dockerProvisionId: Joi.string().custom(objectId),
  }),
};

const deleteDockerProvision = {
  params: Joi.object().keys({
    dockerProvisionId: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createDockerProvision,
  createUser,

  deleteDockerProvision,
  deleteUser,

  getDockerProvision,
  getDockerProvisions,
  getUser,

  updateDockerProvision,
  updateUser,
  updateUserBasicDetail,
};
