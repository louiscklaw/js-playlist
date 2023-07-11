const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { dockerProvisionService } = require('../services');

const getDockerProvisions = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await dockerProvisionService.queryDockerProvisions(filter, options);
    res.send(result);

  } catch (error) {
    console.error(error);

  }
});

const getDockerProvisionCount = catchAsync(async (req, res) => {
  try {
    const result = await dockerProvisionService.countDockerProvision();
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const createDockerProvision = catchAsync(async (req, res) => {
  try {
    const dockerProvision = await dockerProvisionService.createDockerProvision(
      req.body
    );
    res.status(httpStatus.CREATED).send(dockerProvision);

  } catch (error) {
    console.error(error);

  }
});

const getDockerProvisionById = catchAsync(async (req, res) => {
  try {
    const dockerProvision = await dockerProvisionService.getDockerProvisionById(req.params.dockerProvisionId);

    if (!dockerProvision) {
      throw new ApiError(httpStatus.NOT_FOUND, 'DockerProvision not found');
    }
    res.send(dockerProvision);
  } catch (error) {
    console.error(error);
  }
});

// TODO: remove me
// // const updateDockerProvisionById = catchAsync(async (req, res) => {
// //   const dockerProvision = await dockerProvisionService.updateDockerProvisionById(
// //     req.params.dockerProvisionId, req.body);
// //   res.send(dockerProvision);
// // });

const updateDockerProvisionById = catchAsync(async (req, res) => {
  try {
    const dockerProvision = await dockerProvisionService.updateDockerProvisionById(req.params.dockerProvisionId, req.body);
    res.send(dockerProvision);

  } catch (error) {
    console.error(error);

  }
});

const deleteDockerProvisionById = catchAsync(async (req, res) => {
  try {
    await dockerProvisionService.deleteDockerProvisionById(
      req.params.dockerProvisionId
    );
    res.status(httpStatus.NO_CONTENT).send();

  } catch (error) {
    console.error(error);

  }
});

const helloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'dockerProvision.controller' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  getDockerProvisions,
  getDockerProvisionCount,
  getDockerProvisionById,
  updateDockerProvisionById,
  deleteDockerProvisionById,
  // createDockerProvision,
  // getDockerProvisionCount,
  createDockerProvision,
  helloworld,
};
