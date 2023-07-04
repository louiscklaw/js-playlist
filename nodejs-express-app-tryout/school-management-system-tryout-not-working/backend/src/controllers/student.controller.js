const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { studentService } = require('../services');

const getStudents = catchAsync(async (req, res) => {

  console.log('student.controller.getStudents helloworld')
  res.send({ hello: 'student.controller.getStudents' });

  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  // const result = await studentService.queryStudents(filter, options);
  // res.send(result);

});

const helloworld = catchAsync(async (req, res) => {
  console.log('student.controller helloworld')
  res.send({ hello: 'student.controller' });
});

module.exports = {
  getStudents,
  helloworld
};
