const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { studentService } = require('../services');

const getStudents = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await studentService.queryStudents(filter, options);
    // res.send({ hello: 'student.controller.getStudents' });
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const getStudentCount = catchAsync(async (req, res) => {
  try {
    const result = await studentService.countStudent();
    // res.send({ hello: 'student.controller.getStudents' });
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const createStudent = catchAsync(async (req, res) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(httpStatus.CREATED).send(student);
  } catch (error) {
    console.error(error);
  }
});

const getStudentById = catchAsync(async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.studentId);

    if (!student) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
    }
    res.send(student);
  } catch (error) {
    console.error(error);
  }
});

// const updateStudentById = catchAsync(async (req, res) => {
//   const student = await studentService.updateStudentById(
//     req.params.studentId, req.body);
//   res.send(student);
// });

const updateStudentById = catchAsync(async (req, res) => {
  try {
    const student = await studentService.updateStudentById(req.params.studentId, req.body);
    res.send(student);
  } catch (error) {
    console.error(error);
  }
});

const deleteStudentById = catchAsync(async (req, res) => {
  try {
    await studentService.deleteStudentById(req.params.studentId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const helloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'student.controller' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  getStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  createStudent,
  getStudentCount,
  helloworld,
};
