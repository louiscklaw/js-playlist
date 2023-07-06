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
const { Schedule, Student, User, Token } = require('../../../src/models');
const { roleRights } = require('../../../src/config/roles');
const { tokenTypes } = require('../../../src/config/tokens');

const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { scheduleOne, scheduleTwo, insertSchedules } = require('../../fixtures/schedule.fixture');
const { userOneAccessToken, adminAccessToken, scheduleOneAccessToken } = require('../../fixtures/token.fixture');

setupTestDB();

describe('Schedule CRUD test', () => {
  let newSchedule;

  beforeEach((done) => {
    newSchedule = {
      name: faker.name.findName(),
    };

    setTimeout(() => {
      expect(true).toBe(true);
      done();
    }, 100);

  });

  test('get schedule count', async () => {
    await insertSchedules([scheduleOne]);

    const res = await request(app)
      .get('/v1/schedules/getScheduleCount')
      .expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1
    });

  })

  test('add new schedule', async () => {
    const res = await request(app)
      .post('/v1/schedules')
      .send(newSchedule)
      .expect(httpStatus.CREATED);

    expect(res.body).not.toHaveProperty('password');

    const dbUser = await Schedule.findById(res.body.id);

    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newSchedule.name,
    });
  });

  test('list all schedules', async () => {
    await insertSchedules([scheduleOne]);
    const res = await request(app)
      .get('/v1/schedules')
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
      id: scheduleOne._id.toHexString(),
      name: scheduleOne.name,
    });
  })

  // // NOTE: createStudent
  test('create new schedule', async () => {
    const res = await request(app)
      .post('/v1/schedules')
      .set('Authorization', `Bearer ${scheduleOneAccessToken}`)
      .send(newSchedule)
      .expect(httpStatus.CREATED);

    expect(res.body).not.toHaveProperty('password');
    expect(res.body).toEqual({
      id: expect.anything(),
      name: newSchedule.name,
    });

    const dbUser = await Schedule.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newSchedule.name,
    });
  })

  // // NOTE: getStudents
  // test('get schedule information', async () => {
  //   await insertStudents([scheduleOne, scheduleTwo]);

  //   const res = await request(app)
  //     .get('/v1/schedules')
  //     .set('Authorization', `Bearer ${scheduleOneAccessToken}`)
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
  //     id: scheduleOne._id.toHexString(),
  //     name: scheduleOne.name,
  //     email: scheduleOne.email,
  //     role: scheduleOne.role,
  //     isEmailVerified: scheduleOne.isEmailVerified,
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
  // test('modify schedule by id', async () => {
  //   await insertStudents([scheduleOne]);

  //   const res = await request(app)
  //     .patch(`/v1/schedules/${scheduleOne._id}`)
  //     .set('Authorization', `Bearer ${scheduleOneAccessToken}`)
  //     .send({ name: 'blablabla' })
  //     .expect(httpStatus.OK);

  //   const dbUser = await Student.findById(scheduleOne._id);
  //   expect(dbUser).toBeDefined();

  //   expect(dbUser.name).toMatch('blablabla');
  // })

  // // NOTE: deleteStudentById
  // test('delete schedule by id', async () => {
  //   await insertStudents([scheduleOne]);

  //   const res = await request(app)
  //     .delete(`/v1/schedules/${scheduleOne._id}`)
  //     .set('Authorization', `Bearer ${scheduleOneAccessToken}`)
  //     .expect(httpStatus.NO_CONTENT);

  //   const dbStudentOne = await Student.findById(scheduleOne._id);
  //   expect(dbStudentOne).toBeNull();
  // })

  test('GET /v1/schedules/helloworld',
    async () => {
      const res = await request(app)
        .get('/v1/schedules/helloworld')
        .expect(httpStatus.OK);
    });
});

