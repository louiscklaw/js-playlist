const httpStatus = require('http-status');
const { User } = require('../models');
const { DockerProvision } = require('../models');
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

const createDockerProvision = async (userBody) => {
  try {
    if (await DockerProvision.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return DockerProvision.create(userBody);
  } catch (error) {
    console.error(error);
  }
};

const countDockerProvision = async () => {
  const count = await DockerProvision.find().countDocuments();
  return { count };
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<DockerProvision>}
 */
const getDockerProvisionById = async (id) => {
  return DockerProvision.findById(id);
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

const queryDockerProvisions = async (filter, options) => {
  const students = await DockerProvision.paginate(filter, options);
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

const updateDockerProvisionById = async (studentId, updateBody) => {
  const paymentInfo = await getDockerProvisionById(studentId);
  if (!paymentInfo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'DockerProvision not found');
  }
  if (updateBody.email && (await DockerProvision.isEmailTaken(updateBody.email, studentId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(paymentInfo, updateBody);
  await paymentInfo.save();
  return paymentInfo;
};

// deleteDockerProvisionById
const deleteDockerProvisionById = async (studentId) => {
  try {
    const paymentInfo = await getDockerProvisionById(studentId);
    if (!paymentInfo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'DockerProvision not found');
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
  queryDockerProvisions,
  getUserById,
  getUserByEmail,
  updateUserById,
  updateUserByEmail,
  getDockerProvisionById,
  updateDockerProvisionById,
  deleteUserById,
  deleteDockerProvisionById,
  createDockerProvision,
  countDockerProvision,
};
