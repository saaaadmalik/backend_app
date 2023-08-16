const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const ApiError = require("./../utils/ApiError");
const config = require("./../config/config");
const { Admin } = require("./../models");
const {roleRights} = require("../config/roles")

const requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, config.JWT_SECRET);
    req.user = user;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Authorization required");
  }
  next();
};

const authMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new ApiError(httpStatus.BAD_REQUEST, "Only Admin Can Access");
  }
  next();
};

const restrict = (...requiredRights) =>{
  return (req,res,next) =>{
    if(requiredRights.length){
      const userRights = roleRights.get(req.user.role)
      const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight))
      if(!hasRequiredRights && req.params.userId !== req.user._id){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Forbidden')
      }

    }
    next()

  }

}

module.exports = {
  requireSignin,
  authMiddleware,
  restrict
};
