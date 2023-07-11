const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { teacherService } = require('../services');

const getStudents = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await teacherService.queryStudents(filter, options);
    // res.send({ hello: 'student.controller.getStudents' });
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const getTeachers = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await teacherService.queryTeachers(filter, options);
    // res.send({ hello: 'teacher.controller.getTeachers' });
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const createTeacher = catchAsync(async (req, res) => {
  try {
    const teacher = await teacherService.createTeacher(req.body);
    res.status(httpStatus.CREATED).send(teacher);
  } catch (error) {
    console.error(error);
  }
});

const getTeacherById = catchAsync(async (req, res) => {
  try {
    const teacher = await teacherService.getTeacherById(req.params.teacherId);

    if (!teacher) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
    }
    res.send(teacher);
  } catch (error) {
    console.error(error);
  }
});

// const updateStudentById = catchAsync(async (req, res) => {
//   const student = await ​teacherService.updateStudentById(
//     req.params.studentId, req.body);
//   res.send(student);
// });

const updateStudentById = catchAsync(async (req, res) => {
  try {
    const student = await teacherService.updateStudentById(req.params.studentId, req.body);
    res.send(student);
  } catch (error) {
    console.error(error);
  }
});

const updateTeacherById = catchAsync(async (req, res) => {
  try {
    const teacher = await teacherService.updateTeacherById(req.params.teacherId, req.body);

    res.send(teacher);
    // console.log({ hello: 'world' });
    // res.send({ hello: "world" });
  } catch (error) {
    console.error(error);
  }
});

const deleteTeacherById = catchAsync(async (req, res) => {
  try {
    await teacherService.deleteTeacherById(req.params.teacherId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const helloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'teacher.controller' });
  } catch (error) {
    console.error(error);
  }
});

const getTeacherCount = catchAsync(async (req, res) => {
  try {
    const result = await teacherService.countTeacher();
    // res.send({ hello: 'teacher.controller.getTeachers' });
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  getStudents,
  getTeacherById,
  updateStudentById,
  deleteTeacherById,
  createStudent: createTeacher,
  getTeachers,
  updateTeacherById,
  createTeacher,
  getTeacherCount,
  helloworld,
};
