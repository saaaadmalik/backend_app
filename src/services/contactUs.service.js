const httpStatus = require("http-status");
const { ContactUs } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} Body
 * @returns {Promise<Admin>}
 */
const createContactUs = async (body) => {
  try {
    return await ContactUs.create(body);
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = {
  createContactUs,
};
