const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const { roles } = require('./../config/roles')
const mongoDuplicateKeyError = require("../utils/mongoDuplicateKeyError");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: roles,
        default: 'user',

    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    createdBlogs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
        }
    ],
    favouriteBlogs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
        }
    ]
},
    {
        timestamps: true,
    })

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
    return !!user
}

/**
 * check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this
    return bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

mongoDuplicateKeyError(userSchema)

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema)
module.exports = User