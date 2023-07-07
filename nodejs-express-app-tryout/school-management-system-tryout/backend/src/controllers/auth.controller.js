const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  } catch (error) {
    console.error(error);
  }
});

const login = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  } catch (error) {
    console.error(error);
  }
});

const logout = catchAsync(async (req, res) => {
  try {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const refreshTokens = catchAsync(async (req, res) => {
  try {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
  } catch (error) {
    console.error(error);
  }
});

const forgotPassword = catchAsync(async (req, res) => {
  try {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const resetPassword = catchAsync(async (req, res) => {
  try {
    await authService.resetPassword(req.query.token, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  try {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

const verifyEmail = catchAsync(async (req, res) => {
  try {
    await authService.verifyEmail(req.query.token);
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
