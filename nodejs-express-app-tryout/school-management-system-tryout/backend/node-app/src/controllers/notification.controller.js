const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { notificationService } = require('../services');

const getNotifications = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await notificationService.queryNotifications(filter, options);
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const getNotificationCount = catchAsync(async (req, res) => {
  try {
    const result = await notificationService.countNotification();
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const createNotification = catchAsync(async (req, res) => {
  try {
    const notification = await notificationService.createNotification(req.body);
    res.status(httpStatus.CREATED).send(notification);
  } catch (error) {
    console.error(error);
  }
});

const getNotificationById = catchAsync(async (req, res) => {
  try {
    const notification = await notificationService.getNotificationById(req.params.notificationId);

    if (!notification) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Notification not found');
    }
    res.send(notification);
  } catch (error) {
    console.error(error);
  }
});

// // const updateNotificationById = catchAsync(async (req, res) => {
// //   const notification = await notificationService.updateNotificationById(
// //     req.params.notificationId, req.body);
// //   res.send(notification);
// // });

const updateNotificationById = catchAsync(async (req, res) => {
  try {
    const notification = await notificationService.updateNotificationById(req.params.notificationId, req.body);
    res.send(notification);
  } catch (error) {
    console.error(error);
  }
});

const deleteNotificationById = catchAsync(async (req, res) => {
  try {
    await notificationService.deleteNotificationById(req.params.notificationId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const helloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'notification.controller' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  getNotifications,
  getNotificationCount,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
  // createNotification,
  // getNotificationCount,
  createNotification,
  helloworld,
};
