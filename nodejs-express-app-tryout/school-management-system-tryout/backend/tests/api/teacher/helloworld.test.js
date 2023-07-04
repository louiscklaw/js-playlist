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

const { userOne, admin, insertUsers } = require('../../fixtures/user.fixture');
const { userOneAccessToken, adminAccessToken } = require('../../fixtures/token.fixture');

setupTestDB();

describe('Auth routes', () => {
  let newUser;
  beforeEach(() => {
    newUser = {
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      password: 'password1',
      role: "user"
    };
  });

  test('create teacher', async () => {
    const res = await request(app).post('/v1/teachers')
      .send(newUser)
      .expect(httpStatus.CREATED);

    expect(res.body).not.toHaveProperty('password');

    const dbUser = await Teacher.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser.password).not.toBe(newUser.password);

    expect(dbUser).toMatchObject({ name: newUser.name, email: newUser.email, role: 'user', isEmailVerified: false });

  });


  test('teacher api helloworld', async () => {
    const res = await request(app)
      .get('/v1/teachers/helloworld')
      .expect(httpStatus.OK);

  });
});
