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
const { Notification, User, Token } = require('../../../src/models');
const { roleRights } = require('../../../src/config/roles');
const { tokenTypes } = require('../../../src/config/tokens');

const { userOne, insertUsers } = require('../../fixtures/user.fixture');
const { notificationOne, notificationTwo, insertNotifications } = require('../../fixtures/notification.fixture');
const { adminAccessToken, userOneAccessToken } = require('../../fixtures/token.fixture');

setupTestDB();

describe('Notification CRUD test', () => {
  let newNotification;

  beforeEach((done) => {
    newNotification = {
      name: faker.name.findName(),
    };

    setTimeout(() => {
      expect(true).toBe(true);
      done();
    }, 20);
  });

  test('get notification count', async () => {
    await insertNotifications([notificationOne]);

    const res = await request(app).get('/v1/notifications/getNotificationCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  test('add new notification', async () => {
    const res = await request(app).post('/v1/notifications').send(newNotification).expect(httpStatus.CREATED);

    const dbUser = await Notification.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newNotification.name,
    });
  });

  test('get notification count', async () => {
    await insertNotifications([notificationOne]);
    const res = await request(app).get('/v1/notifications/getNotificationCount').expect(httpStatus.OK);

    expect(res.body).toEqual({
      count: 1,
    });
  });

  test('get notification information', async () => {
    await insertNotifications([notificationOne]);
    const res = await request(app).get('/v1/notifications').expect(httpStatus.OK);

    expect(res.body).toEqual({
      results: expect.any(Array),
      page: 1,
      limit: 10,
      totalPages: 1,
      totalResults: 1,
    });

    expect(res.body.results).toHaveLength(1);

    expect(res.body.results[0]).toEqual({
      id: notificationOne._id.toHexString(),
      name: notificationOne.name,
    });
  });

  // NOTE: createNotification
  test('create new notification', async () => {
    const res = await request(app)
      .post('/v1/notifications')
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send(newNotification)
      .expect(httpStatus.CREATED);

    expect(res.body).toEqual({
      id: expect.anything(),
      name: newNotification.name,
    });

    const dbUser = await Notification.findById(res.body.id);
    expect(dbUser).toBeDefined();

    expect(dbUser).toMatchObject({
      name: newNotification.name,
    });
  });

  // NOTE: getNotifications
  test('list all payment info', async () => {
    await insertNotifications([notificationOne, notificationTwo]);

    const res = await request(app)
      .get('/v1/notifications')
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
      id: notificationOne._id.toHexString(),
      name: notificationOne.name,
    });
  });

  // NOTE: updateNotificationById
  test('modify notification by id', async () => {
    await insertNotifications([notificationOne]);

    const res = await request(app)
      .patch(`/v1/notifications/${notificationOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .send({ name: 'blablabla' })
      .expect(httpStatus.OK);

    const dbUser = await Notification.findById(notificationOne._id);
    expect(dbUser).toBeDefined();

    expect(dbUser.name).toMatch('blablabla');
  });

  // NOTE: deleteNotificationById
  test('delete notification by id', async () => {
    await insertNotifications([notificationOne]);

    const res = await request(app)
      .delete(`/v1/notifications/${notificationOne._id}`)
      .set('Authorization', `Bearer ${userOneAccessToken}`)
      .expect(httpStatus.NO_CONTENT);

    const dbNotificationOne = await Notification.findById(notificationOne._id);
    expect(dbNotificationOne).toBeNull();
  });

  test('GET /v1/notifications/helloworld', async () => {
    const res = await request(app).get('/v1/notifications/helloworld').expect(httpStatus.OK);
  });
});
