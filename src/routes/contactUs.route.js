const express = require("express");
const { requireSignin, authMiddleware } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const contactUsValidation = require("../validations/contactUs.validation");
const { contactUsController } = require("../controllers");
const router = express.Router();

router
  .route("/")
  .post(
    requireSignin,
    authMiddleware,
    [validate(contactUsValidation.createContactUs)],
    contactUsController.createContactUs
  );

module.exports = router;
