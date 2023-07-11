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
const { Attendance, User, Token } = require('../../../src/models');
const { roleRights } = require('../../../src/config/roles');
const { tokenTypes } = require('../../../src/config/tokens');

const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { attendanceOne, attendanceTwo, insertAttendances } = require('../../fixtures/attendance.fixture');
const { userOneAccessToken, adminAccessToken, attendanceOneAccessToken } = require('../../fixtures/token.fixture');

setupTestDB();

describe('Attendance CRUD test', () => {
  let newAttendance;

  beforeEach((done) => {
    newAttendance = {
      name: faker.name.findName(),
    };

    setTimeout(() => {
      expect(true).toBe(true);
      done();
    }, 20);
  });

  test('get attendance count', async () => {
    await insertAttendances([attendanceOne]);

    const res = await request(app).get('/v1/attendances/getAttendanceCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  test('add new attendance', async () => {
    const res = await request(app).post('/v1/attendances').send(newAttendance).expect(httpStatus.CREATED);

    const dbUser = await Attendance.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newAttendance.name,
    });
  });

  test('get attendance count', async () => {
    await insertAttendances([attendanceOne]);
    const res = await request(app).get('/v1/attendances/getAttendanceCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  test('list all attendances', async () => {
    await insertAttendances([attendanceOne]);
    const res = await request(app).get('/v1/attendances').expect(httpStatus.OK);

    expect(res.body).toEqual({
      results: expect.any(Array),
      page: 1,
      limit: 10,
      totalPages: 1,
      totalResults: 1,
    });

    expect(res.body.results).toHaveLength(1);

    expect(res.body.results[0]).toEqual({
      id: attendanceOne._id.toHexString(),
      name: attendanceOne.name,
    });
  });

  // NOTE: createAttendance
  test('create new attendance', async () => {
    const res = await request(app)
      .post('/v1/attendances')
      .set('Authorization', `Bearer ${attendanceOneAccessToken}`)
      .send(newAttendance)
      .expect(httpStatus.CREATED);

    expect(res.body).toEqual({
      id: expect.anything(),
      name: newAttendance.name,
    });

    const dbUser = await Attendance.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newAttendance.name,
    });
  });

  // NOTE: getAttendances
  test('get attendance information', async () => {
    await insertAttendances([attendanceOne, attendanceTwo]);

    const res = await request(app)
      .get('/v1/attendances')
      .set('Authorization', `Bearer ${attendanceOneAccessToken}`)
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
      id: attendanceOne._id.toHexString(),
      name: attendanceOne.name,
    });
  });

  // NOTE: updateAttendanceById
  test('modify attendance by id', async () => {
    await insertAttendances([attendanceOne]);

    const res = await request(app)
      .patch(`/v1/attendances/${attendanceOne._id}`)
      .set('Authorization', `Bearer ${attendanceOneAccessToken}`)
      .send({ name: 'blablabla' })
      .expect(httpStatus.OK);

    const dbUser = await Attendance.findById(attendanceOne._id);
    expect(dbUser).toBeDefined();

    expect(dbUser.name).toMatch('blablabla');
  });

  // NOTE: deleteAttendanceById
  test('delete attendance by id', async () => {
    await insertAttendances([attendanceOne]);

    const res = await request(app)
      .delete(`/v1/attendances/${attendanceOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .expect(httpStatus.NO_CONTENT);

    const dbAttendanceOne = await Attendance.findById(attendanceOne._id);
    expect(dbAttendanceOne).toBeNull();
  });

  test('GET /v1/attendances/helloworld', async () => {
    const res = await request(app).get('/v1/attendances/helloworld').expect(httpStatus.OK);
  });
});
