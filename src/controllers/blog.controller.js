const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { blogService } = require("../services");
const ApiError = require("./../utils/ApiError");

const createBlog = catchAsync(async (req, res) => {
  let body = req.body;
  const { _id } = req.user;
  body.createdBy = _id;
  const blog = await blogService.createBlog(body);
  res.status(httpStatus.CREATED).send(blog);
});

const getAllBlog = catchAsync(async (req, res) => {
  let filter = {};
  if (req.query.search) {
    filter = {
      $or: [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
      ],
    };
  }
  const blog = await blogService.getAllBlog(filter);
  res.status(httpStatus.CREATED).send(blog);
});

const updateBlog = catchAsync(async (req, res) => {
  let body = req.body;
  const { blogId } = req.params;
  const blog = await blogService.updateBlog(body, blogId);
  res.status(httpStatus.CREATED).send(blog);
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const blog = await blogService.getSingleBlog(blogId);
  res.status(httpStatus.CREATED).send(blog);
});

const deleteBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const userId = req.user._id;
  const blog = await blogService.deleteBlog(blogId,userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const favouriteABlog = catchAsync(async (req,res)=>{
  const {blogId} = req.params;
  const { _id } = req.user;
  const blog = await blogService.favouriteABlog(blogId,_id);
  res.status(httpStatus.CREATED).send(blog);

})


module.exports = {
  createBlog,
  getAllBlog,
  updateBlog,
  getSingleBlog,
  deleteBlog,
  favouriteABlog
};
