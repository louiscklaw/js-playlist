// const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
// const { userService } = require('../services');

// const createUser = catchAsync(async (req, res) => {
//   const user = await userService.createUser(req.body);
//   res.status(httpStatus.CREATED).send(user);
// });

const getHelloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'get' });
});

const getNameHelloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'getNameHelloworld' });
});

const postHelloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'post' });
});

const putHelloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'put' });
});

const deleteHelloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'delete' });
});

module.exports = {
  getHelloworld,
  postHelloworld,
  putHelloworld,
  deleteHelloworld,
  getNameHelloworld,
};
