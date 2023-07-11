const httpStatus = require('http-status');
const pick = require('../utils/pick');

const ApiError = require('../utils/ApiError');

const catchAsync = require('../utils/catchAsync');

const { paymentInfoService } = require('../services');

const getPaymentInfos = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await paymentInfoService.queryPaymentInfos(filter, options);
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const getPaymentInfoCount = catchAsync(async (req, res) => {
  try {
    const result = await paymentInfoService.countPaymentInfo();
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

const createPaymentInfo = catchAsync(async (req, res) => {
  try {
    const paymentInfo = await paymentInfoService.createPaymentInfo(req.body);
    res.status(httpStatus.CREATED).send(paymentInfo);
  } catch (error) {
    console.error(error);
  }
});

const getPaymentInfoById = catchAsync(async (req, res) => {
  try {
    const paymentInfo = await paymentInfoService.getPaymentInfoById(req.params.paymentInfoId);

    if (!paymentInfo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'PaymentInfo not found');
    }
    res.send(paymentInfo);
  } catch (error) {
    console.error(error);
  }
});

// // const updatePaymentInfoById = catchAsync(async (req, res) => {
// //   const paymentInfo = await paymentInfoService.updatePaymentInfoById(
// //     req.params.paymentInfoId, req.body);
// //   res.send(paymentInfo);
// // });

const updatePaymentInfoById = catchAsync(async (req, res) => {
  try {
    const paymentInfo = await paymentInfoService.updatePaymentInfoById(req.params.paymentInfoId, req.body);
    res.send(paymentInfo);
  } catch (error) {
    console.error(error);
  }
});

const deletePaymentInfoById = catchAsync(async (req, res) => {
  try {
    await paymentInfoService.deletePaymentInfoById(req.params.paymentInfoId);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const helloworld = catchAsync(async (req, res) => {
  try {
    res.send({ hello: 'paymentInfo.controller' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  getPaymentInfos,
  getPaymentInfoCount,
  getPaymentInfoById,
  updatePaymentInfoById,
  deletePaymentInfoById,
  // createPaymentInfo,
  // getPaymentInfoCount,
  createPaymentInfo,
  helloworld,
};
