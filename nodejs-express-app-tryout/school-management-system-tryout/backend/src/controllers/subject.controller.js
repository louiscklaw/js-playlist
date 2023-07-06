const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { subjectService } = require('../services');

const getSubjects = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await subjectService.querySubjects(filter, options);

  res.send(result);
});

const getSubjectCount = catchAsync(async (req, res) => {
  const result = await subjectService.countSubject();
  res.send(result);
});

const createSubject = catchAsync(async (req, res) => {
  const subject = await subjectService.createSubject(req.body);

  res.status(httpStatus.CREATED).send(subject);
});

// const getSubjectById = catchAsync(async (req, res) => {
//   const subject = await subjectService.getSubjectById(req.params.subjectId);

//   if (!subject) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
//   }
//   res.send(subject);
// });

// // const updateSubjectById = catchAsync(async (req, res) => {
// //   const subject = await subjectService.updateSubjectById(
// //     req.params.subjectId, req.body);
// //   res.send(subject);
// // });

const updateSubjectById = catchAsync(async (req, res) => {
  const subject = await subjectService.updateSubjectById(req.params.subjectId, req.body);
  res.send(subject);
});

const deleteSubjectById = catchAsync(async (req, res) => {
  await subjectService.deleteSubjectById(req.params.subjectId);
  res.status(httpStatus.NO_CONTENT).send();
});

const helloworld = catchAsync(async (req, res) => {
  res.send({ hello: 'subject.controller' });
});

module.exports = {
  getSubjects,
  getSubjectCount,
  // getSubjectById,
  updateSubjectById,
  deleteSubjectById,
  // createSubject,
  // getSubjectCount,
  createSubject,
  helloworld,
};
