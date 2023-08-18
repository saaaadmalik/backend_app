const httpStatus = require("http-status");
const { Appointment, Doctor } = require("../models");
const ApiError = require("../utils/ApiError");

const getAppointmentById = async (appointmentId) => {
    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            throw new ApiError(httpStatus.NOT_FOUND, "Appointment not found");
        }
        return appointment

    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const createAppointment = async (appointmentBody) => {
    try {
        const appointment = await Appointment.create(appointmentBody);
        const doctor = await Doctor.findOneAndUpdate({ _id: appointmentBody.doctorId },
            { $push: { appointmentSlots: appointment._id } })
        console.log(doctor)
        return appointment;


    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const bookAppointment = async (appointmentId, userId) => {
    try {
        const appointment = await getAppointmentById(appointmentId);
        if (appointment.isBooked) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Appointment already booked");
        }
        appointment.userId = userId
        appointment.isBooked = true;
        await appointment.save()
        return appointment;

    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const cancelAppointment = async (appointmentId, userId) => {
    try {
        const appointment = await getAppointmentById(appointmentId)
        if (!appointment.isBooked) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Appointment not booked");
        }
        appointment.userId = null;
        appointment.isBooked = false;
        await appointment.save()
        return appointment;

    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);

    }
}

const getDoctorAppointments = async (doctorId) => {
    try {
        const appointments = await Appointment.find({ doctorId: doctorId })
        return appointments;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

const getMyBookedAppointments = async (userId) => {
    try {
        const appointments = await Appointment.find({ userId: userId })
        return appointments;

    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);

    }
}

module.exports = {
    createAppointment,
    bookAppointment,
    cancelAppointment,
    getDoctorAppointments,
    getMyBookedAppointments,
}