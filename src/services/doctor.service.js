const httpStatus = require("http-status");
const { Doctor } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a doctor
 * @param {Object} doctorBody 
 */

const createDoctor = async (doctorBody) =>{
    try {
        const doctor = await Doctor.create(doctorBody);
        return doctor;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = {
    createDoctor,
}