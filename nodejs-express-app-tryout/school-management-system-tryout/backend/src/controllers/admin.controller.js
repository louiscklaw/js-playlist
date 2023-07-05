const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { studentService } = require('../services');
const { adminService } = require('../services');

const getAdmins = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await adminService.queryAdmins(filter, options);
  // res.send({ hello: 'student.controller.getAdmins' });
  res.send(result);

});

const createAdmin = catchAsync(async (req, res) => {
  const admin = await adminService.createAdmin(req.body);
  res.status(httpStatus.CREATED).send(admin);
});

const getStudentById = catchAsync(async (req, res) => {
  const student = await studentService.getStudentById(req.params.studentId);

  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  res.send(student);
});

const getAdminById = catchAsync(async (req, res) => {
  const admin = await adminService.getAdminById(req.params.adminId);


  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, `Admin not found ${req.params.adminId}`);
  }
  res.send(admin);
});

// const updateStudentById = catchAsync(async (req, res) => {
//   const student = await studentService.updateStudentById(
//     req.params.studentId, req.body);
//   res.send(student);
// });

const updateAdminById = catchAsync(async (req, res) => {
  const admin = await adminService.updateAdminById(
    req.params.adminId, req.body);
  res.send(admin);
});

const updateStudentById = catchAsync(async (req, res) => {
  const student = await studentService.updateStudentById(
    req.params.studentId, req.body);
  res.send(student);
});

const deleteAdminById = catchAsync(async (req, res) => {
  await adminService.deleteAdminById(req.params.adminId);
  res.status(httpStatus.NO_CONTENT).send();
});

const helloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'admin.controller' });
});

module.exports = {
  getAdmins,
  getStudentById,
  updateStudentById,
  deleteAdminById,
  getAdminById,
  updateAdminById, createAdmin,
  helloworld
};
