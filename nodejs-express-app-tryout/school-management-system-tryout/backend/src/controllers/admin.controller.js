const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { studentService } = require('../services');
const { adminService } = require('../services');

const getAdminCount = catchAsync(async (req, res) => {
  try {
    const result = await adminService.countAdmin();
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const getAdmins = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await adminService.queryAdmins(filter, options);
    // res.send({ hello: 'student.controller.getAdmins' });
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const createAdmin = catchAsync(async (req, res) => {
  try {
    const admin = await adminService.createAdmin(req.body);
    res.status(httpStatus.CREATED).send(admin);
  } catch (error) {
    console.error(error);
  }
});

const getStudentById = catchAsync(async (req, res) => {
  try {
    const student = await studentService.getStudentById(req.params.studentId);

    if (!student) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
    }
    res.send(student);
  } catch (error) {
    console.error(error);
  }
});

const getAdminById = catchAsync(async (req, res) => {
  try {
    const admin = await adminService.getAdminById(req.params.adminId);

    if (!admin) {
      throw new ApiError(httpStatus.NOT_FOUND, `Admin not found ${req.params.adminId}`);
    }
    res.send(admin);
  } catch (error) {
    console.error(error);
  }
});

// const updateStudentById = catchAsync(async (req, res) => {
//   const student = await studentService.updateStudentById(
//     req.params.studentId, req.body);
//   res.send(student);
// });

const updateAdminById = catchAsync(async (req, res) => {
  try {
    const admin = await adminService.updateAdminById(req.params.adminId, req.body);
    res.send(admin);
  } catch (error) {
    console.error(error);
  }
});

const updateStudentById = catchAsync(async (req, res) => {
  try {
    const student = await studentService.updateStudentById(req.params.studentId, req.body);
    res.send(student);
  } catch (error) {
    console.error(error);
  }
});

const deleteAdminById = catchAsync(async (req, res) => {
  try {
    await adminService.deleteAdminById(req.params.adminId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const helloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'admin.controller' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  getAdmins,
  getStudentById,
  updateStudentById,
  deleteAdminById,
  getAdminById,
  updateAdminById,
  createAdmin,
  getAdminCount,
  helloworld,
};
