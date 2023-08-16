const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const generateJwtToken = require("./../config/generateToken");
const bcrypt = require("bcryptjs");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<Admin>}
 */
const register = async (userBody) => {
  try {
    return await User.create(userBody);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const login = async (userBody) => {
  const user = await User.findOne({ email: userBody.email });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Credentials invalid");
  }
  const checkPassword = await user.isPasswordMatch(userBody.password);
  if (!checkPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Credentials invalid");
  }

  const token = generateJwtToken(user._id, user.role);
  const result = { token, user };
  return result;
};

const updatePassword = async (body, userId) => {
  try {
    let userMember = await User.findById(userId);
    if (!userMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, "No user found");
    }
    const checkPassword = await userMember.isPasswordMatch(body.password);
    if (!checkPassword) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Password invalid");
    }
    // const hashPassword = await bcrypt.hash(body.newPassword, 10);
    // const updateUser = User.findOneAndUpdate(
    //   { _id: userId },
    //   { $set: { password: hashPassword } },
    //   { new: true }
    // );

    userMember.password = body.newPassword;
    const updateUser = await userMember.save();
    return updateUser;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = {
  register,
  login,
  updatePassword,
};
