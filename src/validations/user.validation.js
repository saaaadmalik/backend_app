const Joi = require("joi");
const { objectId, password } = require("./custom.validation");

const getUsers = {
    query: Joi.object().keys({
        username: Joi.string(),
        role: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
}

const getUserById = {
    params:Joi.object().keys({
        userId:Joi.string().required().custom(objectId)
    }),
}

const updateUser = {
    params:Joi.object().keys({
        userId:Joi.string().required().custom(objectId)
    }),
    body:Joi.object().keys({
        username:Joi.string(),
        firstName:Joi.string(),
        lastName:Joi.string(),
        email:Joi.string().email(),
    })
    .min(1)
}

const deleteUser = {
    params:Joi.object().keys({
        userId:Joi.string().required().custom(objectId)
    })
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}   
