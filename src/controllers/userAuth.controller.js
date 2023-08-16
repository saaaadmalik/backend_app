const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userAuthService } = require("../services");

const register = catchAsync(async (req, res) => {
    let body = req.body;
  
    const user = await userAuthService.register(body);
    res.status(httpStatus.CREATED).send(user);
  });
  
  const login = catchAsync(async (req, res) => {
    let body = req.body;
    const user = await userAuthService.login(body);
    res.status(httpStatus.CREATED).send(user);
  });
  
  const updatePassword = catchAsync(async (req, res) => {
    let body = req.body;
    let userId = req.params.userId;
    const user = await userAuthService.updatePassword(body, userId);
    res.status(httpStatus.CREATED).send(user);
  });
  
  module.exports = {
    register,
    login,
    updatePassword,
  };
  