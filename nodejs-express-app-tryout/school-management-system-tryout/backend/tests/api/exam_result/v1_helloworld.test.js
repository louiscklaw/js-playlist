const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const moment = require('moment');
const bcrypt = require('bcryptjs');

const app = require('../../../src/app');
const config = require('../../../src/config/config');
const auth = require('../../../src/middlewares/auth');
const { tokenService, emailService } = require('../../../src/services');
const ApiError = require('../../../src/utils/ApiError');
const setupTestDB = require('../../utils/setupTestDB');
const { Student, User, Token } = require('../../../src/models');
const { roleRights } = require('../../../src/config/roles');
const { tokenTypes } = require('../../../src/config/tokens');

const { examResultOne, insertExamResults } = require('../../fixtures/exam_result.fixture');

const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { studentOne, studentTwo, insertStudents } = require('../../fixtures/student.fixture');
const { userOneAccessToken, adminAccessToken, studentOneAccessToken } = require('../../fixtures/token.fixture');

setupTestDB();

describe('ExamResult CRUD test', () => {
  let newExamResult;

  beforeEach((done) => {
    newExamResult = {
      name: faker.name.findName(),
    };

    setTimeout(() => {
      expect(true).toBe(true);
      done();
    }, 20);
  });

  test('get exam-result count', async () => {
    await insertExamResults([examResultOne]);

    const res = await request(app).get('/v1/exam-results/getExamResultCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  // test('add new student', async () => {
  //   const res = await request(app)
  //     .post('/v1/students')
  //     .send(newStudent)
  //     .expect(httpStatus.CREATED);

  //   expect(res.body).not.toHaveProperty('password');

  //   const dbUser = await Student.findById(res.body.id);
  //   expect(dbUser).toBeDefined();

  //   expect(dbUser.password).not.toBe(newStudent.password);

  //   expect(dbUser).toMatchObject({
  //     name: newStudent.name,
  //     email: newStudent.email,
  //     role: 'user',
  //     isEmailVerified: false
  //   });

  // });

  // test('get student count', async () => {
  //   await insertStudents([studentOne]);
  //   const res = await request(app)
  //     .get('/v1/students/getStudentCount')
  //     .expect(httpStatus.OK);

  //   expect(res.body).toEqual({
  //     count: 1
  //   });

  // })

  // test('get student information', async () => {
  //   await insertStudents([studentOne]);
  //   const res = await request(app)
  //     .get('/v1/students')
  //     .expect(httpStatus.OK);

  //   expect(res.body).toEqual({
  //     results: expect.any(Array),
  //     page: 1,
  //     limit: 10,
  //     totalPages: 1,
  //     totalResults: 1,
  //   });

  //   expect(res.body.results).toHaveLength(1);

  //   expect(res.body.results[0]).toEqual({
  //     id: studentOne._id.toHexString(),
  //     address1: "",
  //     address2: "",
  //     country: "",
  //     hasDiscount: false,
  //     isVerified: false,
  //     phone: "",
  //     state: "",
  //     name: studentOne.name,
  //     email: studentOne.email,
  //     role: studentOne.role,
  //     isEmailVerified: studentOne.isEmailVerified,
  //   });
  // })

  // // NOTE: createStudent
  // test('create new student', async () => {
  //   const res = await request(app)
  //     .post('/v1/students')
  //     .set('Authorization', `Bearer ${studentOneAccessToken}`)
  //     .send(newStudent)
  //     .expect(httpStatus.CREATED);

  //   expect(res.body).not.toHaveProperty('password');
  //   expect(res.body).toEqual({
  //     id: expect.anything(),
  //     name: newStudent.name,
  //     email: newStudent.email,
  //     role: newStudent.role,
  //     isEmailVerified: false,
  //     address1: "",
  //     address2: "",
  //     country: "",
  //     hasDiscount: false,
  //     isVerified: false,
  //     phone: "",
  //     state: "",
  //   });

  //   const dbUser = await Student.findById(res.body.id);
  //   expect(dbUser).toBeDefined();

  //   expect(dbUser.password).not.toBe(newStudent.password);

  //   expect(dbUser).toMatchObject({
  //     name: newStudent.name,
  //     email: newStudent.email,
  //     role: newStudent.role,
  //     isEmailVerified: false,
  //     address1: "",
  //     address2: "",
  //     country: "",
  //     hasDiscount: false,
  //     isVerified: false,
  //     phone: "",
  //     state: "",
  //   });
  // })

  // // NOTE: getStudents
  // test('get student information', async () => {
  //   await insertStudents([studentOne, studentTwo]);

  //   const res = await request(app)
  //     .get('/v1/students')
  //     .set('Authorization', `Bearer ${studentOneAccessToken}`)
  //     .expect(httpStatus.OK);

  //   expect(res.body).toEqual({
  //     results: expect.any(Array),
  //     page: 1,
  //     limit: 10,
  //     totalPages: 1,
  //     totalResults: 2,
  //   });

  //   expect(res.body.results).toHaveLength(2);
  //   expect(res.body.results[0]).toEqual({
  //     id: studentOne._id.toHexString(),
  //     name: studentOne.name,
  //     email: studentOne.email,
  //     role: studentOne.role,
  //     isEmailVerified: studentOne.isEmailVerified,
  //     address1: "",
  //     address2: "",
  //     country: "",
  //     hasDiscount: false,
  //     isVerified: false,
  //     phone: "",
  //     state: "",
  //   });
  // })

  // // NOTE: updateStudentById
  // test('modify student by id', async () => {
  //   await insertStudents([studentOne]);

  //   const res = await request(app)
  //     .patch(`/v1/students/${studentOne._id}`)
  //     .set('Authorization', `Bearer ${studentOneAccessToken}`)
  //     .send({ name: 'blablabla' })
  //     .expect(httpStatus.OK);

  //   const dbUser = await Student.findById(studentOne._id);
  //   expect(dbUser).toBeDefined();

  //   expect(dbUser.name).toMatch('blablabla');
  // })

  // // NOTE: deleteStudentById
  // test('delete student by id', async () => {
  //   await insertStudents([studentOne]);

  //   const res = await request(app)
  //     .delete(`/v1/students/${studentOne._id}`)
  //     .set('Authorization', `Bearer ${studentOneAccessToken}`)
  //     .expect(httpStatus.NO_CONTENT);

  //   const dbStudentOne = await Student.findById(studentOne._id);
  //   expect(dbStudentOne).toBeNull();
  // })

  test('GET /v1/exam-results/helloworld', async () => {
    const res = await request(app).get('/v1/exam-results/helloworld').expect(httpStatus.OK);
  });
});
