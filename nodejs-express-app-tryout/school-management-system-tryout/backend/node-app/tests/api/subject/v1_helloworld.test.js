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
const { Subject, User, Token } = require('../../../src/models');
const { roleRights } = require('../../../src/config/roles');
const { tokenTypes } = require('../../../src/config/tokens');

const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { subjectOne, subjectTwo, insertSubjects } = require('../../fixtures/subject.fixture');
const { userOneAccessToken, adminAccessToken, subjectOneAccessToken } = require('../../fixtures/token.fixture');

const lorem_ipsum = require('../../constants/lorem_ipsum');

setupTestDB();

describe('Subject CRUD test', () => {
  let newSubject;

  beforeEach((done) => {
    newSubject = {
      name: faker.name.findName(),
      description: 'helloworld',
    };

    setTimeout(() => {
      expect(true).toBe(true);
      done();
    }, 20);
  });

  // NOTE: updateSubjectById
  test('modify subject by id', async () => {
    await insertSubjects([subjectOne]);

    const res = await request(app)
      .patch(`/v1/subjects/${subjectOne._id}`)
      .set('Authorization', `Bearer ${subjectOneAccessToken}`)
      .send({ name: 'blablabla' })
      .expect(httpStatus.OK);

    const dbUser = await Subject.findById(subjectOne._id);

    expect(dbUser).toBeDefined();
    expect(dbUser).toMatchObject({
      ...subjectOne,
      name: 'blablabla',
    });
  });

  // NOTE: deleteSubjectById
  test('delete subject by id', async () => {
    await insertSubjects([subjectOne]);

    const res = await request(app)
      .delete(`/v1/subjects/${subjectOne._id}`)
      .set('Authorization', `Bearer ${subjectOneAccessToken}`)
      .expect(httpStatus.NO_CONTENT);

    const dbSubjectOne = await Subject.findById(subjectOne._id);
    expect(dbSubjectOne).toBeNull();
  });

  test('get subject count', async () => {
    await insertSubjects([subjectOne]);

    const res = await request(app).get('/v1/subjects/getSubjectCount').expect(httpStatus.OK);

    expect(res.body).toEqual({ count: 1 });
  });

  test('CREATE /v1/subjects, add new subject', async () => {
    const res = await request(app).post('/v1/subjects').send(newSubject).expect(httpStatus.CREATED);

    expect(res.body).not.toHaveProperty('password');

    const dbSubject = await Subject.findById(res.body.id);
    expect(dbSubject).toBeDefined();
    expect(dbSubject).toMatchObject(res.body);
  });

  test('GET /subjects, list subjects', async () => {
    await insertSubjects([subjectOne]);

    const res = await request(app).get('/v1/subjects').expect(httpStatus.OK);

    expect(res.body).toEqual({
      results: expect.any(Array),
      page: 1,
      limit: 10,
      totalPages: 1,
      totalResults: 1,
    });

    expect(res.body.results).toHaveLength(1);

    expect(res.body.results[0]).toEqual({
      id: subjectOne._id.toHexString(),
      name: subjectOne.name,
      description: subjectOne.description,
    });
  });

  // NOTE: createSubject
  test('create new subject', async () => {
    const res = await request(app)
      .post('/v1/subjects')
      .set('Authorization', `Bearer ${subjectOneAccessToken}`)
      .send(newSubject)
      .expect(httpStatus.CREATED);

    expect(res.body).not.toHaveProperty('password');
    expect(res.body).toEqual({
      id: expect.anything(),
      name: newSubject.name,
      description: newSubject.description,
    });

    const dbSubject = await Subject.findById(res.body.id);
    expect(dbSubject).toBeDefined();

    expect(dbSubject).toMatchObject({
      name: newSubject.name,
      description: newSubject.description,
    });
  });

  // NOTE: getSubjects
  test('get subject information', async () => {
    await insertSubjects([subjectOne, subjectTwo]);

    const res = await request(app)
      .get('/v1/subjects')
      .set('Authorization', `Bearer ${subjectOneAccessToken}`)
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
      id: subjectOne._id.toHexString(),
      name: subjectOne.name,
      description: subjectOne.description,
    });
  });

  test('GET /v1/subjects/helloworld', async () => {
    const res = await request(app).get('/v1/subjects/helloworld').expect(httpStatus.OK);
  });
});
