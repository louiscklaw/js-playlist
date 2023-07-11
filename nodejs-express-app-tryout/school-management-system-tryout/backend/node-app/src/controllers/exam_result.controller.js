const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { examResultService } = require('../services');

const getExamResults = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await examResultService.queryExamResults(filter, options);
    res.send(result);
  } catch (error) {
    console.error(errors);
  }
});

const getExamResultCount = catchAsync(async (req, res) => {
  try {
    const result = await examResultService.countExamResult();
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const createExamResult = catchAsync(async (req, res) => {
  try {
    const examResult = await examResultService.createExamResult(req.body);
    res.status(httpStatus.CREATED).send(examResult);
  } catch (error) {
    console.error(error);
  }
});

const getExamResultById = catchAsync(async (req, res) => {
  try {
    const examResult = await examResultService.getExamResultById(req.params.examResultId);

    if (!examResult) {
      throw new ApiError(httpStatus.NOT_FOUND, 'ExamResult not found');
    }
    res.send(examResult);
  } catch (error) {
    console.error(error);
  }
});

// const updateExamResultById = catchAsync(async (req, res) => {
//   const examResult = await examResultService.updateExamResultById(
//     req.params.examResultId, req.body);
//   res.send(examResult);
// });

const updateExamResultById = catchAsync(async (req, res) => {
  try {
    const examResult = await examResultService.updateExamResultById(req.params.examResultId, req.body);
    res.send(examResult);
  } catch (error) {
    console.error(error);
  }
});

const deleteExamResultById = catchAsync(async (req, res) => {
  try {
    await examResultService.deleteExamResultById(req.params.examResultId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.log(error);
  }
});

const helloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'examResult.controller' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  getExamResults,
  getExamResultCount,
  getExamResultById,
  updateExamResultById,
  deleteExamResultById,
  // createExamResult,
  // getExamResultCount,
  createExamResult,
  helloworld,
};
