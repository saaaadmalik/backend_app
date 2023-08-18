const express = require("express");
const validate = require("../middlewares/validate")
const { requireSignin, restrict } = require("../middlewares/auth");
const userAuthValidation = require("../validations/userAuth.validation")
const { userAuthController } = require("../controllers")
const router = express.Router();

router
    .route("/register")
    .post(
        validate(userAuthValidation.register),
        userAuthController.register
    );

router
    .route("/login")
    .post(
        validate(userAuthValidation.login),
        userAuthController.login
    );

router
    .route("/update/password/:userId")
    .patch(
        requireSignin,
        validate(userAuthValidation.updatePassword),
        restrict("manageUsers"),
        userAuthController.updatePassword
    )

module.exports = router;


