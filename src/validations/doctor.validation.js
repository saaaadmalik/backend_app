const Joi = require("joi");

const createDoctor = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    })
}

module.exports = {
    createDoctor,
}