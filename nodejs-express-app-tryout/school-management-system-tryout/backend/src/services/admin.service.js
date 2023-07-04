const httpStatus = require('http-status');
const { Admin } = require('../models');
const { Teacher } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await Admin.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Admin.create(userBody);
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
  const users = await Admin.paginate(filter, options);
  return users;
};

const queryTeachers = async (filter, options) => {
  const teachers = await Teacher.paginate(filter, options);
  return teachers;
};

const queryAdmins = async (filter, options) => {
  const admins = await Admin.paginate(filter, options);
  return admins;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getAdminById = async (id) => {
  return Admin.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return Admin.findOne({ email });
};

/**
 * Update user by email
 */
const updateUserByEmail = async (userEmail, updateBody) => {
  const user = await getUserByEmail(userEmail);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await Admin.isEmailTaken(updateBody.email, userId))) {
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
const updateAdminById = async (adminId, updateBody) => {
  const admin = await getAdminById(adminId);

  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await Admin.isEmailTaken(updateBody.email, adminId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  Object.assign(admin, updateBody);
  await admin.save();

  return admin;
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

// deleteTeacherById
const deleteTeacherById = async (studentId) => {
  const student = await getTeacherById(studentId);
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  await student.remove();
  return student;
};


/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getAdminById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createTeacher,
  createUser,

  deleteTeacherById,
  deleteUserById,

  getTeacherById,
  getUserByEmail,
  getUserById: getAdminById,
  getAdminById,

  queryAdmins,
  queryTeachers,
  queryUsers,

  updateTeacherById,
  updateUserByEmail,
  updateAdminById,
};
