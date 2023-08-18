const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { appointmentService } = require("../services");
const ApiError = require("../utils/ApiError");

const createAppointment = catchAsync(async (req, res) => {
    let body = req.body;
    const startTimeArray = body.startTime.split(":");
    const endTimeArray = body.endTime.split(":");
    
    const startTimeHours = parseInt(startTimeArray[0]);
    const startTimeMinutes = parseInt(startTimeArray[1]);

    const endTimeHours = parseInt(endTimeArray[0]);
    const endTimeMinutes = parseInt(endTimeArray[1]);

    if(startTimeHours > endTimeHours || (startTimeHours === endTimeHours && startTimeMinutes >= endTimeMinutes)){
        throw new ApiError(httpStatus.BAD_REQUEST, "Start time should be less than end time");
    }

    const appointment = await appointmentService.createAppointment(body);
    res.status(httpStatus.CREATED).send(appointment);
})

const bookAppointment = catchAsync(async (req, res) => {
    const { appointmentId } = req.params;
    const userId = req.user._id;
    const appointment = await appointmentService.bookAppointment(appointmentId, userId);
    res.status(httpStatus.CREATED).send(appointment);
})

const cancelAppointment = catchAsync(async (req, res) => {
    const { appointmentId } = req.params;
    const userId = req.user._id;
    const appointment = await appointmentService.cancelAppointment(appointmentId, userId);
    res.status(httpStatus.CREATED).send(appointment);
})

const getDoctorAppointments = catchAsync(async (req, res) => {
    const { doctorId } = req.params
    const appointments = await appointmentService.getDoctorAppointments(doctorId);
    res.status(httpStatus.OK).send(appointments);
})

const getMyBookedAppointments = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const appointments = await appointmentService.getMyBookedAppointments(userId)
    res.status(httpStatus.OK).send(appointments);
})

module.exports = {
    createAppointment,
    bookAppointment,
    cancelAppointment,
    getDoctorAppointments,
    getMyBookedAppointments,
}