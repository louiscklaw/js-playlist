const httpStatus = require('http-status');
const { User } = require('../models');
const { Teacher } = require('../models');
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

const createTeacher = async (userBody) => {
  if (await Teacher.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Teacher.create(userBody);
};


/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Teacher>}
 */
const getTeacherById = async (id) => {
  return Teacher.findById(id)
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

const queryTeachers = async (filter, options) => {
  const teachers = await Teacher.paginate(filter, options);
  return teachers;
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

const updateTeacherById = async (teacherId, updateBody) => {
  const teacher = await getTeacherById(teacherId);

  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  if (updateBody.email && (await Teacher.isEmailTaken(updateBody.email, teacherId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  Object.assign(teacher, updateBody);

  await teacher.save();

  return teacher;
};

const deleteTeacherById = async (teacherId) => {
  const teacher = await getTeacherById(teacherId);
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  await teacher.remove();
  return teacher;
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
  queryTeachers,
  getUserById,
  getUserByEmail,
  updateUserById, updateUserByEmail, getTeacherById, updateTeacherById,
  deleteUserById, deleteTeacherById, createTeacher,
};
