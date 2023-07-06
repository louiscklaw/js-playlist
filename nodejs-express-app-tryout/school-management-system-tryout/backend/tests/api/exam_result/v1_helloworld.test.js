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
const { ExamResult, User, Token } = require('../../../src/models');
const { roleRights } = require('../../../src/config/roles');
const { tokenTypes } = require('../../../src/config/tokens');

const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { examResultOne, examResultTwo, insertExamResults } = require('../../fixtures/exam_result.fixture');
const { adminAccessToken, userOneAccessToken } = require('../../fixtures/token.fixture');

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

  test('add new examResult', async () => {
    const res = await request(app)
      .post('/v1/exam-results')
      .send(newExamResult)
      .expect(httpStatus.CREATED);

    const dbUser = await ExamResult.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newExamResult.name,
    });

  });

  test('get examResult count', async () => {
    await insertExamResults([examResultOne]);
    const res = await request(app).get('/v1/exam-results/getExamResultCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  test('get examResult information', async () => {
    await insertExamResults([examResultOne]);
    const res = await request(app).get('/v1/exam-results').expect(httpStatus.OK);

    expect(res.body).toEqual({
      results: expect.any(Array),
      page: 1,
      limit: 10,
      totalPages: 1,
      totalResults: 1,
    });

    expect(res.body.results).toHaveLength(1);

    expect(res.body.results[0]).toEqual({
      id: examResultOne._id.toHexString(),
      name: examResultOne.name,
    });
  });

  // NOTE: createExamResult
  test('create new examResult', async () => {
    const res = await request(app)
      .post('/v1/exam-results')
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send(newExamResult)
      .expect(httpStatus.CREATED);

    expect(res.body).toEqual({
      id: expect.anything(),
      name: newExamResult.name,
    });

    const dbUser = await ExamResult.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newExamResult.name,
    });
  });

  // NOTE: getExamResults
  test('list all exam results', async () => {
    await insertExamResults([examResultOne, examResultTwo]);

    const res = await request(app)
      .get('/v1/exam-results')
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
      id: examResultOne._id.toHexString(),
      name: examResultOne.name,
    });
  });

  // NOTE: updateExamResultById
  test('modify examResult by id', async () => {
    await insertExamResults([examResultOne]);

    const res = await request(app)
      .patch(`/v1/exam-results/${examResultOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send({ name: 'blablabla' })
      .expect(httpStatus.OK);

    const dbUser = await ExamResult.findById(examResultOne._id);
    expect(dbUser).toBeDefined();

    expect(dbUser.name).toMatch('blablabla');
  });

  // NOTE: deleteExamResultById
  test('delete examResult by id', async () => {
    await insertExamResults([examResultOne]);

    const res = await request(app)
      .delete(`/v1/exam-results/${examResultOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .expect(httpStatus.NO_CONTENT);

    const dbExamResultOne = await ExamResult.findById(examResultOne._id);
    expect(dbExamResultOne).toBeNull();
  });

  test('GET /v1/exam-results/helloworld', async () => {
    const res = await request(app).get('/v1/exam-results/helloworld').expect(httpStatus.OK);
  });
});
