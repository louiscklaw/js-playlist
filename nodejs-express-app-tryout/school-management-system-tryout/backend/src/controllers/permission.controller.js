const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { permissionService } = require('../services');

const getPermissions = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await permissionService.queryPermissions(filter, options);
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const getPermissionCount = catchAsync(async (req, res) => {
  try {
    const result = await permissionService.countPermission();
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const createPermission = catchAsync(async (req, res) => {
  try {
    const permission = await permissionService.createPermission(req.body);
    res.status(httpStatus.CREATED).send(permission);
  } catch (error) {
    console.error(error);
  }
});

const getPermissionById = catchAsync(async (req, res) => {
  try {
    const permission = await permissionService.getPermissionById(req.params.permissionId);

    if (!permission) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
    }
    res.send(permission);
  } catch (error) {
    console.error(error);
  }
});

// // const updatePermissionById = catchAsync(async (req, res) => {
// //   const permission = await permissionService.updatePermissionById(
// //     req.params.permissionId, req.body);
// //   res.send(permission);
// // });

const updatePermissionById = catchAsync(async (req, res) => {
  try {
    const permission = await permissionService.updatePermissionById(req.params.permissionId, req.body);
    res.send(permission);
  } catch (error) {
    console.error(error);
  }
});

const deletePermissionById = catchAsync(async (req, res) => {
  try {
    await permissionService.deletePermissionById(req.params.permissionId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const helloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'permission.controller' });
});

module.exports = {
  getPermissions,
  getPermissionCount,
  getPermissionById,
  updatePermissionById,
  deletePermissionById,
  // createPermission,
  // getPermissionCount,
  createPermission,
  helloworld,
};
