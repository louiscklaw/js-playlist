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
const { Permission, User, Token } = require('../../../src/models');
const { roleRights } = require('../../../src/config/roles');
const { tokenTypes } = require('../../../src/config/tokens');

const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { permissionOne, permissionTwo, insertPermissions } = require('../../fixtures/permission.fixture');
const { adminAccessToken, userOneAccessToken } = require('../../fixtures/token.fixture');

setupTestDB();

describe('Permission CRUD test', () => {
  let newPermission;

  beforeEach((done) => {
    newPermission = {
      name: faker.name.findName(),
    };

    setTimeout(() => {
      expect(true).toBe(true);
      done();
    }, 20);
  });

  test('get permission count', async () => {
    await insertPermissions([permissionOne]);

    const res = await request(app).get('/v1/permissions/getPermissionCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  test('add new permission', async () => {
    const res = await request(app).post('/v1/permissions').send(newPermission).expect(httpStatus.CREATED);

    const dbUser = await Permission.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newPermission.name,
    });
  });

  test('get permission count', async () => {
    await insertPermissions([permissionOne]);
    const res = await request(app).get('/v1/permissions/getPermissionCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  test('get permission information', async () => {
    await insertPermissions([permissionOne]);
    const res = await request(app).get('/v1/permissions').expect(httpStatus.OK);

    expect(res.body).toEqual({
      results: expect.any(Array),
      page: 1,
      limit: 10,
      totalPages: 1,
      totalResults: 1,
    });

    expect(res.body.results).toHaveLength(1);

    expect(res.body.results[0]).toEqual({
      id: permissionOne._id.toHexString(),
      name: permissionOne.name,
    });
  });

  // NOTE: createPermission
  test('create new permission', async () => {
    const res = await request(app)
      .post('/v1/permissions')
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send(newPermission)
      .expect(httpStatus.CREATED);

    expect(res.body).toEqual({
      id: expect.anything(),
      name: newPermission.name,
    });

    const dbUser = await Permission.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newPermission.name,
    });
  });

  // NOTE: getPermissions
  test('list all payment info', async () => {
    await insertPermissions([permissionOne, permissionTwo]);

    const res = await request(app)
      .get('/v1/permissions')
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
      id: permissionOne._id.toHexString(),
      name: permissionOne.name,
    });
  });

  // NOTE: updatePermissionById
  test('modify permission by id', async () => {
    await insertPermissions([permissionOne]);

    const res = await request(app)
      .patch(`/v1/permissions/${permissionOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send({ name: 'blablabla' })
      .expect(httpStatus.OK);

    const dbUser = await Permission.findById(permissionOne._id);
    expect(dbUser).toBeDefined();

    expect(dbUser.name).toMatch('blablabla');
  });

  // NOTE: deletePermissionById
  test('delete permission by id', async () => {
    await insertPermissions([permissionOne]);

    const res = await request(app)
      .delete(`/v1/permissions/${permissionOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .expect(httpStatus.NO_CONTENT);

    const dbPermissionOne = await Permission.findById(permissionOne._id);
    expect(dbPermissionOne).toBeNull();
  });

  test('GET /v1/permissions/helloworld', async () => {
    const res = await request(app).get('/v1/permissions/helloworld').expect(httpStatus.OK);
  });
});
