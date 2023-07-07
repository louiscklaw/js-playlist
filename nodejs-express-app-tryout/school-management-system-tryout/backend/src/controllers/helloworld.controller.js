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
  try {
    res.send({ hello: 'get' });
  } catch (error) {
    console.error(error);
  }
});

const getNameHelloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'getNameHelloworld' });
  } catch (error) {
    console.error(error);
  }
});

const postHelloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'post' });
  } catch (error) {
    console.error(error);
  }
});

const putHelloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'put' });
  } catch (error) {
    console.error(error);
  }
});

const deleteHelloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'delete' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  getHelloworld,
  postHelloworld,
  putHelloworld,
  deleteHelloworld,
  getNameHelloworld,
};
