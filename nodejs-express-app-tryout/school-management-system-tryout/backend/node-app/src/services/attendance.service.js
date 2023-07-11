const httpStatus = require('http-status');
const { User } = require('../models');
const { Attendance } = require('../models');
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

const createAttendance = async (userBody) => {
  if (await Attendance.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Attendance.create(userBody);
};

const countAttendance = async () => {
  const count = await Attendance.find().countDocuments();
  return { count };
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Attendance>}
 */
const getAttendanceById = async (id) => {
  return Attendance.findById(id);
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

const queryAttendances = async (filter, options) => {
  const attendances = await Attendance.paginate(filter, options);
  return attendances;
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

const updateAttendanceById = async (attendanceId, updateBody) => {
  const attendance = await getAttendanceById(attendanceId);
  if (!attendance) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
  }
  if (updateBody.email && (await Attendance.isEmailTaken(updateBody.email, attendanceId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(attendance, updateBody);
  await attendance.save();
  return attendance;
};

// deleteAttendanceById
const deleteAttendanceById = async (attendanceId) => {
  try {
    const attendance = await getAttendanceById(attendanceId);
    if (!attendance) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Attendance not found');
    }
    await attendance.remove();
    return attendance;
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
  queryAttendances,
  getUserById,
  getUserByEmail,
  updateUserById,
  updateUserByEmail,
  getAttendanceById,
  updateAttendanceById,
  deleteUserById,
  deleteAttendanceById,
  createAttendance,
  countAttendance,
};
