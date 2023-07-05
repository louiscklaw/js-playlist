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

const { userOne, admin, insertUsers } = require('../../fixtures/user.fixture');
const { studentOne, insertStudents } = require('../../fixtures/student.fixture');
const { userOneAccessToken, adminAccessToken, studentOneAccessToken } = require('../../fixtures/token.fixture');

setupTestDB();

describe('Auth routes', () => {
  let newStudent;
  beforeEach(() => {
    newStudent = {
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      password: 'password1',
      role: "user"
    };
  });

  test('add new student', async () => {
    const res = await request(app)
      .post('/v1/students')
      .send(newStudent)
      .expect(httpStatus.CREATED);

    expect(res.body).not.toHaveProperty('password');

    const dbUser = await Student.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser.password).not.toBe(newStudent.password);

    expect(dbUser).toMatchObject({
      name: newStudent.name,
      email: newStudent.email,
      role: 'user',
      isEmailVerified: false
    });

  });

  test('get student information', async () => {
    await insertStudents([studentOne]);
    const res = await request(app)
      .get('/v1/students')
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
      id: studentOne._id.toHexString(),
      address1: "",
      address2: "",
      country: "",
      hasDiscount: false,
      isVerified: false,
      phone: "",
      state: "",
      name: studentOne.name,
      email: studentOne.email,
      role: studentOne.role,
      isEmailVerified: studentOne.isEmailVerified,
    });
  })


  test('create student information', async () => {
    const res = await request(app)
      .post('/v1/students')
      .set('Authorization', `Bearer ${studentOneAccessToken}`)
      .send(newStudent)
      .expect(httpStatus.CREATED);

    expect(res.body).not.toHaveProperty('password');
    expect(res.body).toEqual({
      id: expect.anything(),
      name: newStudent.name,
      email: newStudent.email,
      role: newStudent.role,
      isEmailVerified: false,
      address1: "",
      address2: "",
      country: "",
      hasDiscount: false,
      isVerified: false,
      phone: "",
      state: "",
    });

    const dbUser = await Student.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser.password).not.toBe(newStudent.password);

    expect(dbUser).toMatchObject({
      name: newStudent.name,
      email: newStudent.email,
      role: newStudent.role,
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

  test('student api helloworld', async () => {
    const res = await request(app)
      .get('/v1/students/helloworld')
      .expect(httpStatus.OK);

  });
});

