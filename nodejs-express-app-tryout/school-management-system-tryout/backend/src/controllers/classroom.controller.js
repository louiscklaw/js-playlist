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
  try {
    const result = await classroomService.countClassroom();
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const createClassroom = catchAsync(async (req, res) => {
  try {
    const classroom = await classroomService.createClassroom(req.body);
    res.status(httpStatus.CREATED).send(classroom);
  } catch (error) {
    console.error(error);
  }
});

const getClassroomById = catchAsync(async (req, res) => {
  try {
    const classroom = await classroomService.getClassroomById(req.params.classroomId);

    if (!classroom) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Classroom not found');
    }
    res.send(classroom);
  } catch (error) {
    console.error(error);
  }
});

const updateClassroomById = catchAsync(async (req, res) => {
  try {
    const classroom = await classroomService.updateClassroomById(req.params.classroomId, req.body);
    res.send(classroom);
  } catch (error) {
    console.error(error);
  }
});

// const updateClassroomById = catchAsync(async (req, res) => {
//   const classroom = await classroomService.updateClassroomById(
//     req.params.classroomId, req.body);
//   res.send(classroom);
// });

const deleteClassroomById = catchAsync(async (req, res) => {
  try {
    await classroomService.deleteClassroomById(req.params.classroomId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const helloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'classroom.controller' });
});

module.exports = {
  getClassrooms,
  getClassroomCount,
  getClassroomById,
  updateClassroomById,
  deleteClassroomById,
  // createClassroom,
  createClassroom,
  helloworld,
};
