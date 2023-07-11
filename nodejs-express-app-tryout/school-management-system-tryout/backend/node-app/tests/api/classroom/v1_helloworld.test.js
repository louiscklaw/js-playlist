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
const { Classroom, Student, User, Token } = require('../../../src/models');
const { roleRights } = require('../../../src/config/roles');
const { tokenTypes } = require('../../../src/config/tokens');

const { classroomOne, classroomTwo, insertClassrooms } = require('../../fixtures/classroom.fixture');

const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { studentOne, studentTwo, insertStudents } = require('../../fixtures/student.fixture');
const { userOneAccessToken, adminAccessToken, studentOneAccessToken } = require('../../fixtures/token.fixture');

setupTestDB();

describe('Classroom CRUD test', () => {
  let newClassroom;

  beforeEach((done) => {
    newClassroom = {
      name: faker.name.findName(),
    };

    setTimeout(() => {
      expect(true).toBe(true);
      done();
    }, 100);
  });

  test('get classroom count', async () => {
    await insertClassrooms([classroomOne]);

    const res = await request(app).get('/v1/classrooms/getClassroomCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  test('add new classroom', async () => {
    const res = await request(app).post('/v1/classrooms').send(newClassroom).expect(httpStatus.CREATED);

    const dbUser = await Classroom.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newClassroom.name,
    });
  });

  test('get classroom count', async () => {
    await insertClassrooms([classroomOne]);
    const res = await request(app).get('/v1/classrooms/getClassroomCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  test('get classroom information', async () => {
    await insertClassrooms([classroomOne]);
    const res = await request(app).get('/v1/classrooms').expect(httpStatus.OK);

    expect(res.body).toEqual({
      results: expect.any(Array),
      page: 1,
      limit: 10,
      totalPages: 1,
      totalResults: 1,
    });

    expect(res.body.results).toHaveLength(1);

    expect(res.body.results[0]).toEqual({
      id: classroomOne._id.toHexString(),
      name: classroomOne.name,
    });
  });

  // NOTE: createClassroom
  test('create new classroom', async () => {
    const res = await request(app)
      .post('/v1/classrooms')
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send(newClassroom)
      .expect(httpStatus.CREATED);

    expect(res.body).toEqual({
      id: expect.anything(),
      name: newClassroom.name,
    });

    const dbUser = await Classroom.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newClassroom.name,
    });
  });

  // NOTE: getClassrooms
  test('list all classroom', async () => {
    await insertClassrooms([classroomOne, classroomTwo]);

    const res = await request(app)
      .get('/v1/classrooms')
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
      id: classroomOne._id.toHexString(),
      name: classroomOne.name,
    });
  });

  // NOTE: updateClassroomById
  test('modify classroom by id', async () => {
    await insertClassrooms([classroomOne]);

    const res = await request(app)
      .patch(`/v1/classrooms/${classroomOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send({ name: 'blablabla' })
      .expect(httpStatus.OK);

    const dbUser = await Classroom.findById(classroomOne._id);
    expect(dbUser).toBeDefined();

    expect(dbUser.name).toMatch('blablabla');
  });

  // NOTE: deleteClassroomById
  test('delete classroom by id', async () => {
    await insertClassrooms([classroomOne]);

    const res = await request(app)
      .delete(`/v1/classrooms/${classroomOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .expect(httpStatus.NO_CONTENT);

    const dbClassroomOne = await Classroom.findById(classroomOne._id);
    expect(dbClassroomOne).toBeNull();
  });

  test('GET /v1/classrooms/helloworld', async () => {
    const res = await request(app).get('/v1/classrooms/helloworld').expect(httpStatus.OK);
  });
});
