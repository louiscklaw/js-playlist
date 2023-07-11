const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { attendanceService } = require('../services');

const getAttendances = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await attendanceService.queryAttendances(filter, options);
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const getAttendanceCount = catchAsync(async (req, res) => {
  try {
    const result = await attendanceService.countAttendance();
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const createAttendance = catchAsync(async (req, res) => {
  try {
    const attendance = await attendanceService.createAttendance(req.body);
    res.status(httpStatus.CREATED).send(attendance);
  } catch (error) {
    console.error(error);
  }
});

const getAttendanceById = catchAsync(async (req, res) => {
  try {
    const attendance = await attendanceService.getAttendanceById(req.params.attendanceId);

    if (!attendance) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
    }
    res.send(attendance);
  } catch (error) {
    console.error(error);
  }
});

// const updateAttendanceById = catchAsync(async (req, res) => {
//   const attendance = await attendanceService.updateAttendanceById(
//     req.params.attendanceId, req.body);
//   res.send(attendance);
// });

const updateAttendanceById = catchAsync(async (req, res) => {
  try {
    const attendance = await attendanceService.updateAttendanceById(req.params.attendanceId, req.body);
    res.send(attendance);
  } catch (error) {
    console.error(error);
  }
});

const deleteAttendanceById = catchAsync(async (req, res) => {
  try {
    await attendanceService.deleteAttendanceById(req.params.attendanceId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const helloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'attendance.controller' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  getAttendances,
  getAttendanceCount,
  getAttendanceById,

  updateAttendanceById,
  deleteAttendanceById,
  createAttendance,
  getAttendanceCount,
  createAttendance,
  helloworld,
};
