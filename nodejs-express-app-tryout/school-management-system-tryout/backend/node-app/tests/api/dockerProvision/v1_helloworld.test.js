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
const { DockerProvision, User, Token } = require('../../../src/models');
const { roleRights } = require('../../../src/config/roles');
const { tokenTypes } = require('../../../src/config/tokens');

const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { dockerProvisionOne, dockerProvisionTwo, insertDockerProvisions } = require('../../fixtures/docker_provision.fixture');
const { adminAccessToken, userOneAccessToken } = require('../../fixtures/token.fixture');

setupTestDB();

describe('DockerProvision CRUD test', () => {
  let newDockerProvision;

  beforeEach((done) => {
    newDockerProvision = {
      name: faker.name.findName(),
    };

    setTimeout(() => {
      expect(true).toBe(true);
      done();
    }, 200);
  });

  test('get dockerProvision count', async () => {
    await insertDockerProvisions([dockerProvisionOne]);

    const res = await request(app).get('/v1/docker-provisions/getDockerProvisionCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  test('add new dockerProvision', async () => {
    const res = await request(app).post('/v1/docker-provisions').send(newDockerProvision).expect(httpStatus.CREATED);

    const dbUser = await DockerProvision.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newDockerProvision.name,
    });
  });

  test('get dockerProvision count', async () => {
    await insertDockerProvisions([dockerProvisionOne]);
    const res = await request(app)
      .get('/v1/docker-provisions/getDockerProvisionCount')
      .expect(httpStatus.OK);

    expect(res.body).toEqual({ count: 1, });
  });

  test('get dockerProvision information', async () => {
    await insertDockerProvisions([dockerProvisionOne]);
    const res = await request(app)
      .get('/v1/docker-provisions')
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
      id: dockerProvisionOne._id.toHexString(),
      name: dockerProvisionOne.name,
    });
  });

  // NOTE: createDockerProvision
  test('create new dockerProvision', async () => {
    const res = await request(app)
      .post('/v1/docker-provisions')
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send(newDockerProvision)
      .expect(httpStatus.CREATED);

    expect(res.body).toEqual({
      id: expect.anything(),
      name: newDockerProvision.name,
    });

    const dbUser = await DockerProvision.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newDockerProvision.name,
    });
  });

  // NOTE: getDockerProvisions
  test('list all docker provision', async () => {
    await insertDockerProvisions(
      [dockerProvisionOne, dockerProvisionTwo]
    );

    const res = await request(app)
      .get('/v1/docker-provisions')
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
      id: dockerProvisionOne._id.toHexString(),
      name: dockerProvisionOne.name,
    });
  });

  // NOTE: updateDockerProvisionById
  test('modify dockerProvision by id', async () => {
    await insertDockerProvisions([dockerProvisionOne]);

    const res = await request(app)
      .patch(`/v1/docker-provisions/${dockerProvisionOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send({ name: 'blablabla' })
      .expect(httpStatus.OK);

    const dbUser = await DockerProvision.findById(
      dockerProvisionOne._id
    );
    expect(dbUser).toBeDefined();

    expect(dbUser.name).toMatch('blablabla');
  });

  // NOTE: deleteDockerProvisionById
  test('delete dockerProvision by id', async () => {
    await insertDockerProvisions([dockerProvisionOne]);

    const res = await request(app)
      .delete(`/v1/docker-provisions/${dockerProvisionOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .expect(httpStatus.NO_CONTENT);

    // const dbDockerProvisionOne = await DockerProvision.findById(dockerProvisionOne._id);
    // expect(dbDockerProvisionOne).toBeNull();
  });

  test('GET /v1/docker-provisions/helloworld', async () => {
    const res = await request(app)
      .get('/v1/docker-provisions/helloworld')
      .expect(httpStatus.OK);
  });
});
