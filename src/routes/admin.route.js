const express = require("express");
const { requireSignin, authMiddleware } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const adminValidation = require("../validations/admin.validation");
const { adminController } = require("../controllers");
const router = express.Router();

router
  .route("/register")
  .post(
    validate(adminValidation.register),
    requireSignin,
    authMiddleware,
    adminController.register
  );

router
  .route("/login")
  .post(validate(adminValidation.login), adminController.login);
router
  .route("/update/password/:userId")
  .patch(
    validate(adminValidation.updatePassword),
    requireSignin,
    authMiddleware,
    adminController.updatePassword
  );
module.exports = router;
