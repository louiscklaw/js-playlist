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
const { Exam, User, Token } = require('../../../src/models');
const { roleRights } = require('../../../src/config/roles');
const { tokenTypes } = require('../../../src/config/tokens');

const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { examOne, examTwo, insertExams } = require('../../fixtures/exam.fixture');
const { userOneAccessToken, adminAccessToken, examOneAccessToken } = require('../../fixtures/token.fixture');

setupTestDB();

describe('Exam CRUD test', () => {
  let newExam;

  beforeEach((done) => {
    newExam = {
      name: faker.name.findName(),
    };

    setTimeout(() => {
      expect(true).toBe(true);
      done();
    }, 20);
  });

  test('get exam count', async () => {
    await insertExams([examOne]);

    const res = await request(app).get('/v1/exams/getExamCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  test('add new exam', async () => {
    const res = await request(app)
      .post('/v1/exams')
      .send(newExam)
      .expect(httpStatus.CREATED);


    const dbUser = await Exam.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newExam.name,
    });

  });

  test('get exam count', async () => {
    await insertExams([examOne]);
    const res = await request(app)
      .get('/v1/exams/getExamCount')
      .expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1
    });

  })

  test('list exams', async () => {
    await insertExams([examOne]);
    const res = await request(app)
      .get('/v1/exams')
      .expect(httpStatus.OK);

    expect(res.body).toEqual({
      results: expect.any(Array),
      page: 1,
      limit: 10,
      totalPages: 1,
      totalResults: 1,
    });

    expect(res.body.results).toHaveLength(1);

    expect(res.body.results[0]).toEqual({
      id: examOne._id.toHexString(),
      name: examOne.name,
    });
  })

  // NOTE: createExam
  test('create new exam', async () => {
    const res = await request(app)
      .post('/v1/exams')
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send(newExam)
      .expect(httpStatus.CREATED);

    expect(res.body).toEqual({
      id: expect.anything(),
      name: newExam.name,
    });

    const dbUser = await Exam.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newExam.name,
    });
  });

  // NOTE: getExams
  test('list all exam', async () => {
    await insertExams([examOne, examTwo]);

    const res = await request(app)
      .get('/v1/exams')
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .expect(httpStatus.OK);

    expect(res.body).toEqual({
      results: expect.any(Array),
      page: 1,
      limit: 10,
      totalPages: 1,
      totalResults: 2,
    });

    expect(res.body.results).toHaveLength(2);
    expect(res.body.results[0]).toEqual({
      id: examOne._id.toHexString(),
      name: examOne.name,
    });
  });

  // NOTE: updateExamById
  test('modify exam by id', async () => {
    await insertExams([examOne]);

    const res = await request(app)
      .patch(`/v1/exams/${examOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send({ name: 'blablabla' })
      .expect(httpStatus.OK);

    const dbUser = await Exam.findById(examOne._id);
    expect(dbUser).toBeDefined();

    expect(dbUser.name).toMatch('blablabla');
  });

  // NOTE: deleteExamById
  test('delete exam by id', async () => {
    await insertExams([examOne]);

    const res = await request(app)
      .delete(`/v1/exams/${examOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .expect(httpStatus.NO_CONTENT);

    const dbExamOne = await Exam.findById(examOne._id);
    expect(dbExamOne).toBeNull();
  });

  test('GET /v1/exams/helloworld', async () => {
    const res = await request(app).get('/v1/exams/helloworld').expect(httpStatus.OK);
  });
});
