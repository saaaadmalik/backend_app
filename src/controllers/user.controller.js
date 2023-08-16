const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const pick = require("../utils/pick");

const getUsers = catchAsync(async(req,res)=>{
    const filter = pick(req.query, ["username", "role"]);
    const options = pick(req.query, ["sortBy", "limit", "page"]);
    const result = await userService.getUsers(filter,options);
    res.status(httpStatus.CREATED).send(result);

})

const getUserById = catchAsync(async(req,res)=>{
    const {userId}= req.params;
    const user = await userService.getUserById(userId);
    res.status(httpStatus.CREATED).send(user);
})

const updateUser = catchAsync(async(req,res)=>{
    const {userId} = req.params;
    const body = req.body;
    const user = await userService.updateUser(userId,body);
    res.status(httpStatus.CREATED).send(user);
})

const deleteUser = catchAsync(async(req,res)=>{
    const {userId} = req.params;
    const user = await userService.deleteUser(userId);
    res.status(httpStatus.NO_CONTENT).send();
})

module.exports ={
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}