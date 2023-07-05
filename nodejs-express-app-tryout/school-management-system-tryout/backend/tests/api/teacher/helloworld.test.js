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
const { Teacher, User, Token } = require('../../../src/models');
const { roleRights } = require('../../../src/config/roles');
const { tokenTypes } = require('../../../src/config/tokens');

const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { teacherOne, teacherTwo, admin, insertTeachers } = require('../../fixtures/teacher.fixture');
const { teacherOneAccessToken, adminAccessToken } = require('../../fixtures/token.fixture');

setupTestDB();

describe('Teacher CRUD test', () => {
  let newTeacher;

  beforeEach(() => {
    newTeacher = {
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      password: 'password1',
      role: "user"
    };
  });

  test('add new teacher', async () => {
    const res = await request(app)
      .post('/v1/teachers')
      .send(newTeacher)
      .expect(httpStatus.CREATED);

    expect(res.body).not.toHaveProperty('password');

    const dbUser = await Teacher.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser.password).not.toBe(newTeacher.password);

    expect(dbUser).toMatchObject({
      name: newTeacher.name,
      email: newTeacher.email,
      role: 'user',
      isEmailVerified: false
    });

  });

  test('get teacher information', async () => {
    await insertTeachers([teacherOne]);
    const res = await request(app)
      .get('/v1/teachers')
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
      id: teacherOne._id.toHexString(),
      address1: "",
      address2: "",
      country: "",
      hasDiscount: false,
      isVerified: false,
      phone: "",
      state: "",
      name: teacherOne.name,
      email: teacherOne.email,
      role: teacherOne.role,
      isEmailVerified: teacherOne.isEmailVerified,
    });
  })

  // NOTE: createTeacher
  test('create new teacher', async () => {
    const res = await request(app)
      .post('/v1/teachers')
      .set('Authorization', `Bearer ${teacherOneAccessToken}`)
      .send(newTeacher)
      .expect(httpStatus.CREATED);

    expect(res.body).not.toHaveProperty('password');
    expect(res.body).toEqual({
      id: expect.anything(),
      name: newTeacher.name,
      email: newTeacher.email,
      role: newTeacher.role,
      isEmailVerified: false,
      address1: "",
      address2: "",
      country: "",
      hasDiscount: false,
      isVerified: false,
      phone: "",
      state: "",
    });

    const dbUser = await Teacher.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser.password).not.toBe(newTeacher.password);

    expect(dbUser).toMatchObject({
      name: newTeacher.name,
      email: newTeacher.email,
      role: newTeacher.role,
      isEmailVerified: false,
      address1: "",
      address2: "",
      country: "",
      hasDiscount: false,
      isVerified: false,
      phone: "",
      state: "",
    });
  })

  // NOTE: getTeachers
  test('get teacher information', async () => {
    await insertTeachers([teacherOne, teacherTwo]);

    const res = await request(app)
      .get('/v1/teachers')
      .set('Authorization', `Bearer ${teacherOneAccessToken}`)
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
      id: teacherOne._id.toHexString(),
      name: teacherOne.name,
      email: teacherOne.email,
      role: teacherOne.role,
      isEmailVerified: teacherOne.isEmailVerified,
      address1: "",
      address2: "",
      country: "",
      hasDiscount: false,
      isVerified: false,
      phone: "",
      state: "",
    });
  })

  // NOTE: updateTeacherById
  test('modify teacher by id', async () => {
    await insertTeachers([teacherOne]);

    const res = await request(app)
      .patch(`/v1/teachers/${teacherOne._id}`)
      .set('Authorization', `Bearer ${teacherOneAccessToken}`)
      .send({ name: 'blablabla' })
      .expect(httpStatus.OK);

    const dbUser = await Teacher.findById(teacherOne._id);
    expect(dbUser).toBeDefined();

    expect(dbUser.name).toMatch('blablabla');
  })

  // NOTE: deleteTeacherById
  test('delete teacher by id', async () => {
    await insertTeachers([teacherOne]);

    const res = await request(app)
      .delete(`/v1/teachers/${teacherOne._id}`)
      .set('Authorization', `Bearer ${teacherOneAccessToken}`)
      .expect(httpStatus.NO_CONTENT);

    const dbTeacherOne = await Teacher.findById(teacherOne._id);
    expect(dbTeacherOne).toBeNull();
  })

  test('teacher api helloworld', async () => {
    const res = await request(app)
      .get('/v1/teachers/helloworld')
      .expect(httpStatus.OK);

  });
});
