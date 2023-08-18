const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const ApiError = require("./../utils/ApiError");
const config = require("./../config/config");
const { Blog, Appointment } = require("../models");
const { roleRights } = require("../config/roles")

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

const restrict = (...requiredRights) => {
  return (req, res, next) => {
    if (requiredRights.length) {
      const userRights = roleRights.get(req.user.role)
      const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight))
      if (!hasRequiredRights && req.params.userId !== req.user._id) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Forbidden')
      }

    }
    next()

  }

}

const blogRestriction = (...requiredRights) => {
  return async (req, res, next) => {
    try {
      if (requiredRights.length) {
        const userRights = roleRights.get(req.user.role)
        const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight))
        const blog = await Blog.findById(req.params.blogId)
        if (!blog) {
          throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found')
        }
        if (!hasRequiredRights && blog.createdBy.toString() !== req.user._id) {
         throw new ApiError(httpStatus.UNAUTHORIZED, 'Forbidden')
        }
      }
      next()

    } catch (error) {
      next(error)

    }

  }
}

const appointmentRestriction = async (req,res,next) =>{
  try {
    const appointment = await Appointment.findById(req.params.appointmentId)
    if(!appointment){
      throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found')
    }
    if(appointment.userId.toString() !== req.user._id){
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Forbidden')
    }
    next()
  } catch (error) {
    next(error)
  }
} 


module.exports = {
  requireSignin,
  authMiddleware,
  restrict,
  blogRestriction,
  appointmentRestriction
};
