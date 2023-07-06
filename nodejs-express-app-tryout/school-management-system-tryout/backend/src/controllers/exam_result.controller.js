const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { examResultService } = require('../services');

const getExamResults = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await examResultService.queryExamResults(filter, options);
  res.send(result);
});

const getExamResultCount = catchAsync(async (req, res) => {
  const result = await examResultService.countExamResult();
  res.send(result);
});

const createExamResult = catchAsync(async (req, res) => {
  const examResult = await examResultService.createExamResult(req.body);
  res.status(httpStatus.CREATED).send(examResult);
});

// const getExamResultById = catchAsync(async (req, res) => {
//   const examResult = await examResultService.getExamResultById(req.params.examResultId);

//   if (!examResult) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'ExamResult not found');
//   }
//   res.send(examResult);
// });

// // const updateExamResultById = catchAsync(async (req, res) => {
// //   const examResult = await examResultService.updateExamResultById(
// //     req.params.examResultId, req.body);
// //   res.send(examResult);
// // });

// const updateExamResultById = catchAsync(async (req, res) => {
//   const examResult = await examResultService.updateExamResultById(
//     req.params.examResultId, req.body);
//   res.send(examResult);
// });

// const deleteExamResultById = catchAsync(async (req, res) => {
//   await examResultService.deleteExamResultById(req.params.examResultId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

const helloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'examResult.controller' });
});

module.exports = {
  getExamResults,
  getExamResultCount,
  // getExamResultById,
  // updateExamResultById,
  // deleteExamResultById,
  // createExamResult,
  // getExamResultCount,
  createExamResult,
  helloworld,
};
