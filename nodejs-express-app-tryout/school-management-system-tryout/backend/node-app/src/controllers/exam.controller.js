const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { examService } = require('../services');

const getExams = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await examService.queryExams(filter, options);
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const getExamCount = catchAsync(async (req, res) => {
  try {
    const result = await examService.countExam();
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const createExam = catchAsync(async (req, res) => {
  try {
    const exam = await examService.createExam(req.body);
    res.status(httpStatus.CREATED).send(exam);
  } catch (error) {
    console.error(error);
  }
});

const getExamById = catchAsync(async (req, res) => {
  try {
    const exam = await examService.getExamById(req.params.examId);

    if (!exam) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found');
    }
    res.send(exam);
  } catch (error) {
    console.error(error);
  }
});

const updateExamById = catchAsync(async (req, res) => {
  try {
    const exam = await examService.updateExamById(req.params.examId, req.body);
    res.send(exam);
  } catch (error) {
    console.error(error);
  }
});

// const updateExamById = catchAsync(async (req, res) => {
//   const exam = await examService.updateExamById(
//     req.params.examId, req.body);
//   res.send(exam);
// });

const deleteExamById = catchAsync(async (req, res) => {
  try {
    await examService.deleteExamById(req.params.examId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const helloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'exam.controller' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  getExams,
  getExamCount,
  getExamById,
  updateExamById,
  deleteExamById,
  // createExam,
  // getExamCount,
  createExam,
  helloworld,
};
