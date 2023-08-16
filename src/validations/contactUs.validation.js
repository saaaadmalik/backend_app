const Joi = require("joi");

const createContactUs = {
  body: Joi.object().keys({
    service: Joi.string().required(),
    companyName: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.number().required(),
    contactForm: Joi.string().required(),
  }),
};

module.exports = {
  createContactUs,
};
