const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { scheduleService } = require('../services');

const getSchedules = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await scheduleService.querySchedules(filter, options);
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const getScheduleCount = catchAsync(async (req, res) => {
  try {
    const result = await scheduleService.countSchedule();
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const createSchedule = catchAsync(async (req, res) => {
  try {
    const schedule = await scheduleService.createSchedule(req.body);
    res.status(httpStatus.CREATED).send(schedule);
  } catch (error) {
    console.error(error);
  }
});

const getScheduleById = catchAsync(async (req, res) => {
  try {
    const schedule = await scheduleService.getScheduleById(req.params.scheduleId);

    if (!schedule) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Schedule not found');
    }

    res.send(schedule);
  } catch (error) {
    console.error(error);
  }
});

// const updateScheduleById = catchAsync(async (req, res) => {
//   const schedule = await scheduleService.updateScheduleById(
//     req.params.scheduleId, req.body);
//   res.send(schedule);
// });

const updateScheduleById = catchAsync(async (req, res) => {
  try {
    const schedule = await scheduleService.updateScheduleById(req.params.scheduleId, req.body);
    res.send(schedule);
  } catch (error) {
    console.error(error);
  }
});

const deleteScheduleById = catchAsync(async (req, res) => {
  try {
    await scheduleService.deleteScheduleById(req.params.scheduleId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const helloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'schedule.controller' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  getSchedules,
  getScheduleCount,
  getScheduleById,
  updateScheduleById,
  deleteScheduleById,
  // createSchedule,
  // getScheduleCount,
  createSchedule,
  helloworld,
};
