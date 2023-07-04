const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { studentService } = require('../services');

const getAdmins = catchAsync(async (req, res) => {
  console.log('student.controller.getAdmins helloworld');

  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await studentService.queryStudents(filter, options);
  // res.send({ hello: 'student.controller.getAdmins' });
  res.send(result);

});

const createStudent = catchAsync(async (req, res) => {
  const student = await studentService.createStudent(req.body);
  res.status(httpStatus.CREATED).send(student);
});

const getStudentById = catchAsync(async (req, res) => {
  const student = await studentService.getStudentById(req.params.studentId);

  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }
  res.send(student);
});

// const updateStudentById = catchAsync(async (req, res) => {
//   const student = await studentService.updateStudentById(
//     req.params.studentId, req.body);
//   res.send(student);
// });

const updateStudentById = catchAsync(async (req, res) => {
  const student = await studentService.updateStudentById(
    req.params.studentId, req.body);
  res.send(student);
});

const deleteStudentById = catchAsync(async (req, res) => {
  await studentService.deleteStudentById(req.params.studentId);
  res.status(httpStatus.NO_CONTENT).send();
});

const helloworld = catchAsync(async (req, res) => {
  console.log('admin.controller helloworld')
  res.send({ hello: 'admin.controller' });
});

module.exports = {
  getAdmins,
  getStudentById, updateStudentById, deleteStudentById, createStudent,
  helloworld
};
