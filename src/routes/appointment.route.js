const express = require('express');
const { requireSignin, authMiddleware, appointmentRestriction } = require('../middlewares/auth');
const appointmentValidation = require("../validations/appointment.validation");
const validate = require("../middlewares/validate");
const { appointmentController } = require("../controllers");
const router = express.Router();

router
    .route("/")
    .post(
        requireSignin,
        [validate(appointmentValidation.createAppointment)],
        authMiddleware,
        appointmentController.createAppointment
    )

router
    .route("/book/:appointmentId")
    .patch(
        requireSignin,
        [validate(appointmentValidation.bookAppointment)],
        appointmentController.bookAppointment
    )
router
    .route("/cancel/:appointmentId")
    .patch(
        requireSignin,
        [validate(appointmentValidation.cancelAppointment)],
        appointmentRestriction,
        appointmentController.cancelAppointment
    )

router
    .route("/doctor/:doctorId")
    .get(
        requireSignin,
        [validate(appointmentValidation.getDoctorAppointments)],
        appointmentController.getDoctorAppointments
    )
router
    .route("/user/my-appointments/")
    .get(
        requireSignin,
        appointmentController.getMyBookedAppointments
    )

module.exports = router;