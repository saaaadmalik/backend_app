const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { doctorService } = require("../services");


const createDoctor = catchAsync(async (req,res)=>{
    let body = req.body;
    const doctor = await doctorService.createDoctor(body);
    res.status(httpStatus.CREATED).send(doctor);
})

module.exports = {
    createDoctor,
}