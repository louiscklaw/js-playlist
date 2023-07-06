const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { attendanceService } = require('../services');

const getAttendances = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await attendanceService.queryAttendances(filter, options);
  res.send(result);
});

const getAttendanceCount = catchAsync(async (req, res) => {
  const result = await attendanceService.countAttendance();
  res.send(result);
});

const createAttendance = catchAsync(async (req, res) => {
  const attendance = await attendanceService.createAttendance(req.body);
  res.status(httpStatus.CREATED).send(attendance);
});

// const getAttendanceById = catchAsync(async (req, res) => {
//   const attendance = await attendanceService.getAttendanceById(req.params.attendanceId);

//   if (!attendance) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
//   }
//   res.send(attendance);
// });

// // const updateAttendanceById = catchAsync(async (req, res) => {
// //   const attendance = await attendanceService.updateAttendanceById(
// //     req.params.attendanceId, req.body);
// //   res.send(attendance);
// // });

// const updateAttendanceById = catchAsync(async (req, res) => {
//   const attendance = await attendanceService.updateAttendanceById(
//     req.params.attendanceId, req.body);
//   res.send(attendance);
// });

// const deleteAttendanceById = catchAsync(async (req, res) => {
//   await attendanceService.deleteAttendanceById(req.params.attendanceId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

const helloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'attendance.controller' });
});

module.exports = {
  getAttendances,
  getAttendanceCount,
  // getAttendanceById,
  // updateAttendanceById,
  // deleteAttendanceById,
  // createAttendance,
  // getAttendanceCount,
  createAttendance,
  helloworld,
};
