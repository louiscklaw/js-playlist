const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { teacherService } = require('../services');

const getStudents = catchAsync(async (req, res) => {
  console.log('student.controller.getStudents helloworld');

  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await teacherService.queryStudents(filter, options);
  // res.send({ hello: 'student.controller.getStudents' });
  res.send(result);

});

const getTeachers = catchAsync(async (req, res) => {
  console.log('teacher.controller.getTeachers helloworld');

  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await teacherService.queryTeachers(filter, options);
  // res.send({ hello: 'teacher.controller.getTeachers' });
  res.send(result);

});

const createStudent = catchAsync(async (req, res) => {
  const student = await teacherService.createStudent(req.body);
  res.status(httpStatus.CREATED).send(student);
});

const getTeacherById = catchAsync(async (req, res) => {
  const teacher = await teacherService.getTeacherById(req.params.teacherId);

  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  res.send(teacher);
});

// const updateStudentById = catchAsync(async (req, res) => {
//   const student = await ​teacherService.updateStudentById(
//     req.params.studentId, req.body);
//   res.send(student);
// });

const updateStudentById = catchAsync(async (req, res) => {
  const student = await teacherService.updateStudentById(
    req.params.studentId, req.body);
  res.send(student);
});

const updateTeacherById = catchAsync(async (req, res) => {

  const teacher = await teacherService.updateTeacherById(
    req.params.teacherId, req.body);

  res.send(teacher);
  // console.log({ hello: 'world' });
  // res.send({ hello: "world" });
});

const deleteStudentById = catchAsync(async (req, res) => {
  await teacherService.deleteStudentById(req.params.studentId);
  res.status(httpStatus.NO_CONTENT).send();
});

const helloworld = catchAsync(async (req, res) => {
  console.log('teacher.controller helloworld')
  res.send({ hello: 'teacher.controller' });
});

module.exports = {
  getStudents,
  getTeacherById,
  updateStudentById,
  deleteStudentById,
  createStudent,
  getTeachers, updateTeacherById,
  helloworld
};
