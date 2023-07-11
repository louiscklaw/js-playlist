const httpStatus = require('http-status');
const { User } = require('../models');
const { PaymentInfo } = require('../models');
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

const createPaymentInfo = async (userBody) => {
  try {
    if (await PaymentInfo.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return PaymentInfo.create(userBody);
  } catch (error) {
    console.error(error);
  }
};

const countPaymentInfo = async () => {
  const count = await PaymentInfo.find().countDocuments();
  return { count };
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<PaymentInfo>}
 */
const getPaymentInfoById = async (id) => {
  return PaymentInfo.findById(id);
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

const queryPaymentInfos = async (filter, options) => {
  const students = await PaymentInfo.paginate(filter, options);
  return students;
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

const updatePaymentInfoById = async (studentId, updateBody) => {
  const paymentInfo = await getPaymentInfoById(studentId);
  if (!paymentInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'PaymentInfo not found');
  }
  if (updateBody.email && (await PaymentInfo.isEmailTaken(updateBody.email, studentId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(paymentInfo, updateBody);
  await paymentInfo.save();
  return paymentInfo;
};

// deletePaymentInfoById
const deletePaymentInfoById = async (studentId) => {
  try {
    const paymentInfo = await getPaymentInfoById(studentId);
    if (!paymentInfo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'PaymentInfo not found');
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
  queryPaymentInfos,
  getUserById,
  getUserByEmail,
  updateUserById,
  updateUserByEmail,
  getPaymentInfoById,
  updatePaymentInfoById,
  deleteUserById,
  deletePaymentInfoById,
  createPaymentInfo,
  countPaymentInfo,
};
