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
const { PaymentInfo, User, Token } = require('../../../src/models');
const { roleRights } = require('../../../src/config/roles');
const { tokenTypes } = require('../../../src/config/tokens');

const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { paymentInfoOne, paymentInfoTwo, insertPaymentInfos } = require('../../fixtures/payment_info.fixture');
const { adminAccessToken, userOneAccessToken } = require('../../fixtures/token.fixture');

setupTestDB();

describe('PaymentInfo CRUD test', () => {
  let newPaymentInfo;

  beforeEach((done) => {
    newPaymentInfo = {
      name: faker.name.findName(),
    };

    setTimeout(() => {
      expect(true).toBe(true);
      done();
    }, 20);
  });

  test('get paymentInfo count', async () => {
    await insertPaymentInfos([paymentInfoOne]);

    const res = await request(app).get('/v1/payment-infos/getPaymentInfoCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  test('add new paymentInfo', async () => {
    const res = await request(app)
      .post('/v1/payment-infos')
      .send(newPaymentInfo)
      .expect(httpStatus.CREATED);


    const dbUser = await PaymentInfo.findById(res.body.id);
    expect(dbUser).toBeDefined();


    expect(dbUser).toMatchObject({
      name: newPaymentInfo.name,
    });

  });

  test('get paymentInfo count', async () => {
    await insertPaymentInfos([paymentInfoOne]);
    const res = await request(app).get('/v1/payment-infos/getPaymentInfoCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  test('get paymentInfo information', async () => {
    await insertPaymentInfos([paymentInfoOne]);
    const res = await request(app).get('/v1/payment-infos').expect(httpStatus.OK);

    expect(res.body).toEqual({
      results: expect.any(Array),
      page: 1,
      limit: 10,
      totalPages: 1,
      totalResults: 1,
    });

    expect(res.body.results).toHaveLength(1);

    expect(res.body.results[0]).toEqual({
      id: paymentInfoOne._id.toHexString(),
      name: paymentInfoOne.name,
    });
  });

  // NOTE: createPaymentInfo
  test('create new paymentInfo', async () => {
    const res = await request(app)
      .post('/v1/payment-infos')
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send(newPaymentInfo)
      .expect(httpStatus.CREATED);

    expect(res.body).toEqual({
      id: expect.anything(),
      name: newPaymentInfo.name,
    });

    const dbUser = await PaymentInfo.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newPaymentInfo.name,
    });
  });

  // NOTE: getPaymentInfos
  test('list all payment info', async () => {
    await insertPaymentInfos([paymentInfoOne, paymentInfoTwo]);

    const res = await request(app)
      .get('/v1/payment-infos')
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
      id: paymentInfoOne._id.toHexString(),
      name: paymentInfoOne.name,
    });
  });

  // NOTE: updatePaymentInfoById
  test('modify paymentInfo by id', async () => {
    await insertPaymentInfos([paymentInfoOne]);

    const res = await request(app)
      .patch(`/v1/payment-infos/${paymentInfoOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send({ name: 'blablabla' })
      .expect(httpStatus.OK);

    const dbUser = await PaymentInfo.findById(paymentInfoOne._id);
    expect(dbUser).toBeDefined();

    expect(dbUser.name).toMatch('blablabla');
  });

  // NOTE: deletePaymentInfoById
  test('delete paymentInfo by id', async () => {
    await insertPaymentInfos([paymentInfoOne]);

    const res = await request(app)
      .delete(`/v1/payment-infos/${paymentInfoOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .expect(httpStatus.NO_CONTENT);

    const dbPaymentInfoOne = await PaymentInfo.findById(paymentInfoOne._id);
    expect(dbPaymentInfoOne).toBeNull();
  });

  test('GET /v1/payment-infos/helloworld', async () => {
    const res = await request(app).get('/v1/payment-infos/helloworld').expect(httpStatus.OK);
  });
});
