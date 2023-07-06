const httpStatus = require('http-status');
const { User } = require('../models');
const { ExamResult } = require('../models');
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

const createExamResult = async (userBody) => {
  if (await ExamResult.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return ExamResult.create(userBody);
};

const countExamResult = async () => {
  const count = await ExamResult.find().countDocuments();
  return { count };
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<ExamResult>}
 */
const getExamResultById = async (id) => {
  try {
    return ExamResult.findById(id);
  } catch (error) {
    console.error(error);
  }
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

const queryExamResults = async (filter, options) => {
  try {
    const examResults = await ExamResult.paginate(filter, options);
    return examResults;
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

const updateExamResultById = async (examResultId, updateBody) => {
  try {
    const examResult = await getExamResultById(examResultId);
    if (!examResult) {
      throw new ApiError(httpStatus.NOT_FOUND, 'ExamResult not found');
    }
    if (updateBody.email && (await ExamResult.isEmailTaken(updateBody.email, examResultId))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(examResult, updateBody);
    await examResult.save();
    return examResult;
  } catch (error) {
    console.error(error);
  }
};

// deleteExamResultById
const deleteExamResultById = async (examResultId) => {
  try {
    const examResult = await getExamResultById(examResultId);
    if (!examResult) {
      throw new ApiError(httpStatus.NOT_FOUND, 'ExamResult not found');
    }
    await examResult.remove();
    return examResult;
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
  countExamResult,
  createExamResult,
  createUser,

  deleteExamResultById,
  deleteUserById,

  getExamResultById,
  getUserByEmail,
  getUserById,

  queryExamResults,
  queryUsers,

  updateExamResultById,
  updateUserByEmail,
  updateUserById,
};
