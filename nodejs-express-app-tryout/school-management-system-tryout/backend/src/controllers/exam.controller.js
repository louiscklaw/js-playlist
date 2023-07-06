const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { examService } = require('../services');

const getExams = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await examService.queryExams(filter, options);
  res.send(result);
});

const getExamCount = catchAsync(async (req, res) => {
  const result = await examService.countExam();
  res.send(result);
});

const createExam = catchAsync(async (req, res) => {
  const exam = await examService.createExam(req.body);
  res.status(httpStatus.CREATED).send(exam);
});

// const getExamById = catchAsync(async (req, res) => {
//   const exam = await examService.getExamById(req.params.examId);

//   if (!exam) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found');
//   }
//   res.send(exam);
// });

// // const updateExamById = catchAsync(async (req, res) => {
// //   const exam = await examService.updateExamById(
// //     req.params.examId, req.body);
// //   res.send(exam);
// // });

// const updateExamById = catchAsync(async (req, res) => {
//   const exam = await examService.updateExamById(
//     req.params.examId, req.body);
//   res.send(exam);
// });

// const deleteExamById = catchAsync(async (req, res) => {
//   await examService.deleteExamById(req.params.examId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

const helloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'exam.controller' });
});

module.exports = {
  getExams,
  getExamCount,
  // getExamById,
  // updateExamById,
  // deleteExamById,
  // createExam,
  // getExamCount,
  createExam,
  helloworld,
};
