const Joi = require("joi");
const {objectId, password} = require("./custom.validation");

const register = {
    body:Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().custom(password),
        role: Joi.string(),
    }),
}

const login = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}

const updatePassword = {
    params: Joi.object().keys({
        userId : Joi.required().custom(objectId)
    }),
    body: Joi.object().keys({
        password: Joi.string().required().custom(password),
        newPassword: Joi.string().required().custom(password),
        confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required()
    })
}

module.exports = {
    register,
    login,
    updatePassword
}