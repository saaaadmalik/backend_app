const mongoose = require("mongoose")
const {toJSON, paginate} = require("./plugins")
const mongoDuplicateKeyError = require("../utils/mongoDuplicateKeyError")

const doctorSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    appointmentSlots:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
        }
    ]
})

doctorSchema.plugin(toJSON)
doctorSchema.plugin(paginate)

mongoDuplicateKeyError(doctorSchema)

const Doctor = mongoose.model("Doctor",doctorSchema)
module.exports = Doctor;