const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");


/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const getUsers = async (filter, options) => {
    try {
        const users = await User.paginate(filter, options);
        return users;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(httpStatus.BAD_REQUEST, "No user found");
        }
        return user;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */

const updateUser = async (userId, body) => {
    try {
        const user = await getUserById(userId)
        if (body.email && (await User.isEmailTaken(body.email, userId))) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
        }
        Object.assign(user, body)
        await user.save();
        return user;
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

/**
 * Delete user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */

const deleteUser = async (userId) => {
    try {
        const user = await getUserById(userId);
        await user.remove();
        return user;

    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);

    }
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}