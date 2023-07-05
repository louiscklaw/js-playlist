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
const { Admin, User, Token } = require('../../../src/models');
const { roleRights } = require('../../../src/config/roles');
const { tokenTypes } = require('../../../src/config/tokens');

const { userOne, admin, insertUsers } = require('../../fixtures/user.fixture');
const { userOneAccessToken, adminAccessToken, adminOneAccessToken } = require('../../fixtures/token.fixture');
const { adminOne, adminTwo, insertAdmins } = require('../../fixtures/admin.fixture');

setupTestDB();

describe('Admin CRUD test', () => {
  let newAdmin;
  beforeEach(() => {
    newAdmin = {
      name: faker.name.findName(),
      email: faker.internet.email().toLowerCase(),
      password: 'password1',
      role: "admin"
    };

    setTimeout(() => {
      expect(true).toBe(true);
    }, 200);

  });

  test('add new admin', async () => {
    const res = await request(app)
      .post('/v1/admins')
      .send(newAdmin)
      .expect(httpStatus.CREATED);

    expect(res.body).not.toHaveProperty('password');

    const dbUser = await Admin.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser.password).not.toBe(newAdmin.password);

    expect(dbUser).toMatchObject({
      name: newAdmin.name,
      email: newAdmin.email,
      role: 'admin',
      isEmailVerified: false
    });

  });

  test('get admin count', async () => {
    await insertAdmins([adminOne]);

    const res = await request(app)
      .get('/v1/admins/getAdminCount')
      .expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1
    });

  })

  test('get admin information', async () => {
    await insertAdmins([adminOne]);

    const res = await request(app)
      .get('/v1/admins')
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
      id: adminOne._id.toHexString(),
      address1: "",
      address2: "",
      country: "",
      hasDiscount: false,
      isVerified: false,
      phone: "",
      state: "",
      name: adminOne.name,
      email: adminOne.email,
      role: adminOne.role,
      isEmailVerified: adminOne.isEmailVerified,
    });
  })

  // NOTE: createAdmin
  test('create new admin', async () => {
    const res = await request(app)
      .post('/v1/admins')
      .set('Authorization', `Bearer ${adminOneAccessToken}`)
      .send(newAdmin)
      .expect(httpStatus.CREATED);

    expect(res.body).not.toHaveProperty('password');
    expect(res.body).toEqual({
      id: expect.anything(),
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      isEmailVerified: false,
      address1: "",
      address2: "",
      country: "",
      hasDiscount: false,
      isVerified: false,
      phone: "",
      state: "",
    });

    const dbAdmin = await Admin.findById(res.body.id);
    expect(dbAdmin).toBeDefined();

    expect(dbAdmin.password).not.toBe(newAdmin.password);

    expect(dbAdmin).toMatchObject({
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
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

  // NOTE: getAdmins
  test('get admin information', async () => {
    await insertAdmins([adminOne, adminTwo]);

    const res = await request(app)
      .get('/v1/admins')
      .set('Authorization', `Bearer ${adminOneAccessToken}`)
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
      id: adminOne._id.toHexString(),
      name: adminOne.name,
      email: adminOne.email,
      role: adminOne.role,
      isEmailVerified: adminOne.isEmailVerified,
      address1: "",
      address2: "",
      country: "",
      hasDiscount: false,
      isVerified: false,
      phone: "",
      state: "",
    });
  })

  // NOTE: updateAdminById
  test('modify admin by id', async () => {
    await insertAdmins([adminOne]);

    const res = await request(app)
      .patch(`/v1/admins/${adminOne._id}`)
      .set('Authorization', `Bearer ${adminOneAccessToken}`)
      .send({ name: 'blablabla' })
      .expect(httpStatus.OK);

    const dbUser = await Admin.findById(adminOne._id);
    expect(dbUser).toBeDefined();

    expect(dbUser.name).toMatch('blablabla');
  })

  // NOTE: deleteAdminById
  test('delete admin by id', async () => {
    await insertAdmins([adminOne]);

    const res = await request(app)
      .delete(`/v1/admins/${adminOne._id}`)
      .set('Authorization', `Bearer ${adminOneAccessToken}`)
      .expect(httpStatus.NO_CONTENT);

    const dbAdminOne = await Admin.findById(adminOne._id);
    expect(dbAdminOne).toBeNull();
  })

  test('GET /v1/admins/helloworld', async () => {
    const res = await request(app).get('/v1/admins/helloworld').expect(httpStatus.OK);

  });
});
