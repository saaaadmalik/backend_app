const express = require('express');
const { requireSignin, authMiddleware } = require('../middlewares/auth');
const doctorValidation = require("../validations/doctor.validation");
const validate = require("../middlewares/validate");
const { doctorController } = require("../controllers");
const router = express.Router();

router
    .route("/")
    .post(
        requireSignin,
        [validate(doctorValidation.createDoctor)],
        authMiddleware,
        doctorController.createDoctor
    )

module.exports = router;