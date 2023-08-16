const express = require('express')
const validate = require('../middlewares/validate')
const { requireSignin, restrict } = require("../middlewares/auth");
const userValidation = require("../validations/user.validation")
const { userController } = require("../controllers")
const router = express.Router();

router
    .route("/")
    .get(
        requireSignin,
        validate(userValidation.getUsers),
        userController.getUsers)

router
    .route("/:userId")
    .get(
        requireSignin,
        validate(userValidation.getUserById),
        userController.getUserById)
    .patch(
        requireSignin,
        restrict("manageUsers"),
        validate(userValidation.updateUser),
        userController.updateUser)
    .delete(
        requireSignin,
        restrict("manageUsers"),
        validate(userValidation.deleteUser),
        userController.deleteUser)

module.exports = router;
