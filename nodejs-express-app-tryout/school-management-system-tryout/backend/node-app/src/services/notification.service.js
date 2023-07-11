const httpStatus = require('http-status');
const { User } = require('../models');
const { Notification } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

const createNotification = async (userBody) => {
  try {
    if (await Notification.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return Notification.create(userBody);
  } catch (error) {
    console.error(error);
  }
};

const countNotification = async () => {
  const count = await Notification.find().countDocuments();
  return { count };
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Notification>}
 */
const getNotificationById = async (id) => {
  return Notification.findById(id);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const queryNotifications = async (filter, options) => {
  try {
    const students = await Notification.paginate(filter, options);
    return students;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by email
 */
const updateUserByEmail = async (userEmail, updateBody) => {
  const user = await getUserByEmail(userEmail);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const updateNotificationById = async (studentId, updateBody) => {
  const paymentInfo = await getNotificationById(studentId);
  if (!paymentInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notification not found');
  }
  if (updateBody.email && (await Notification.isEmailTaken(updateBody.email, studentId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(paymentInfo, updateBody);
  await paymentInfo.save();
  return paymentInfo;
};

// deleteNotificationById
const deleteNotificationById = async (studentId) => {
  try {
    const paymentInfo = await getNotificationById(studentId);
    if (!paymentInfo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Notification not found');
    }
    await paymentInfo.remove();
    return paymentInfo;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  queryNotifications,
  getUserById,
  getUserByEmail,
  updateUserById,
  updateUserByEmail,
  getNotificationById,
  updateNotificationById,
  deleteUserById,
  deleteNotificationById,
  createNotification,
  countNotification,
};
