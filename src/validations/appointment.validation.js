const Joi = require('joi')
    .extend(require('@joi/date'));
const { objectId, time} = require("./custom.validation");

const createAppointment = {
    body: Joi.object().keys({
        doctorId: Joi.string().required().custom(objectId),
        date: Joi.date().required(),
        startTime: Joi.string().required().custom(time),
        endTime: Joi.string().required().custom(time),
    })
}

const bookAppointment = {
    params: Joi.object().keys({
        appointmentId: Joi.string().required().custom(objectId)
    }),
}

const cancelAppointment = {
    params: Joi.object().keys({
        appointmentId: Joi.string().required().custom(objectId)
    }),
}

const getDoctorAppointments = {
    params: Joi.object().keys({
        doctorId: Joi.string().required().custom(objectId)
    }),
}



module.exports = {
    createAppointment,
    bookAppointment,
    cancelAppointment,
    getDoctorAppointments,
}



