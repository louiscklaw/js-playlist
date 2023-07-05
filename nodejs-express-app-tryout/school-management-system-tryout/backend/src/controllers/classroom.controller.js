const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { classroomService } = require('../services');

const getClassrooms = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await classroomService.queryClassrooms(filter, options);
  res.send(result);
});

const getClassroomCount = catchAsync(async (req, res) => {
  console.log('get classroom count');

  const result = await classroomService.countClassroom()
  res.send(result);
});

const createClassroom = catchAsync(async (req, res) => {
  const classroom = await classroomService.createClassroom(req.body);
  res.status(httpStatus.CREATED).send(classroom);
});

// const getClassroomById = catchAsync(async (req, res) => {
//   const classroom = await classroomService.getClassroomById(req.params.classroomId);

//   if (!classroom) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Classroom not found');
//   }
//   res.send(classroom);
// });

// // const updateClassroomById = catchAsync(async (req, res) => {
// //   const classroom = await classroomService.updateClassroomById(
// //     req.params.classroomId, req.body);
// //   res.send(classroom);
// // });

// const updateClassroomById = catchAsync(async (req, res) => {
//   const classroom = await classroomService.updateClassroomById(
//     req.params.classroomId, req.body);
//   res.send(classroom);
// });

// const deleteClassroomById = catchAsync(async (req, res) => {
//   await classroomService.deleteClassroomById(req.params.classroomId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

const helloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'classroom.controller' });
});

module.exports = {
  getClassrooms,
  getClassroomCount,
  // getClassroomById,
  // updateClassroomById,
  // deleteClassroomById,
  // createClassroom,
  createClassroom,
  helloworld
};
