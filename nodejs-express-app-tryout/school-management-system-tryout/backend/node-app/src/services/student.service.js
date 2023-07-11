const httpStatus = require('http-status');
const { User } = require('../models');
const { Student } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  try {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return User.create(userBody);
  } catch (error) {
    console.error(error);
  }
};

const createStudent = async (userBody) => {
  try {
    if (await Student.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return Student.create(userBody);
  } catch (error) {
    console.error(error);
  }
};

const countStudent = async () => {
  try {
    const count = await Student.find().countDocuments();
    return { count };
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<Student>}
 */
const getStudentById = async (id) => {
  try {
    return Student.findById(id);
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
  try {
    const users = await User.paginate(filter, options);
    return users;
  } catch (error) {
    console.error(error);
  }
};

const queryStudents = async (filter, options) => {
  try {
    const students = await Student.paginate(filter, options);
    return students;
  } catch (error) {
    // console.error(error);
  }
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  try {
    return User.findById(id);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  try {
    return User.findOne({ email });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Update user by email
 */
const updateUserByEmail = async (userEmail, updateBody) => {
  try {
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
  } catch (error) {
    console.error(error);
  }
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  try {
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
  } catch (error) {
    console.error(error);
  }
};

const updateStudentById = async (studentId, updateBody) => {
  try {
    const student = await getStudentById(studentId);
    if (!student) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
    }
    if (updateBody.email && (await Student.isEmailTaken(updateBody.email, studentId))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }

    Object.assign(student, updateBody);

    await student.save();
    return student;
  } catch (error) {
    console.error(error);
  }
};

// deleteStudentById
const deleteStudentById = async (studentId) => {
  try {
    const student = await getStudentById(studentId);
    if (!student) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
    }
    await student.remove();
    return student;
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
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
    return user;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createUser,
  queryUsers,
  queryStudents,
  getUserById,
  getUserByEmail,
  updateUserById,
  updateUserByEmail,
  getStudentById,
  updateStudentById,
  deleteUserById,
  deleteStudentById,
  createStudent,
  countStudent,
};
