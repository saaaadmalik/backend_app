const httpStatus = require("http-status");
const { Blog, User } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a blog
 * @param {Object} blogBody
 * 
 */
const createBlog = async (blogBody) => {
  try {
    const createdBlog = await Blog.create(blogBody);
    await User.findOneAndUpdate({ _id: blogBody.createdBy }, { $push: { createdBlogs: createdBlog._id } }, { new: true })
    return createdBlog;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const getAllBlog = async (filter) => {
  try {
    // const blogs = await Blog.find(filter);
    const blogs = await Blog.paginate(filter, { populate: "createdBy,isFavouriteOf" });
    return blogs;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const updateBlog = async (blogBody, blogId) => {
  try {
    const blog = await getSingleBlog(blogId)
    Object.assign(blog, blogBody)
    await blog.save();
    return blog;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const getSingleBlog = async (blogId) => {
  try {
    // const blog = await Blog.findById(blogId);
    const blog = await Blog.paginate({ _id: blogId }, { populate: "createdBy,isFavouriteOf" });
    if (!blog) {
      throw new ApiError(httpStatus.BAD_REQUEST, "No blog found");
    }
    return blog.results[0];
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const deleteBlog = async (blogId, userId) => {
  try {
    const blog = await getSingleBlog(blogId)
    await blog.remove();

    await User.findOneAndUpdate({ _id: userId }, { $pull: { createdBlogs: blogId } }, { new: true })

    await User.updateMany({ favouriteBlogs: blogId }, { $pull: { favouriteBlogs: blogId } }, { new: true })

    return blog;


  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const favouriteABlog = async (blogId, userId) => {
  try {
    const blog = await Blog.findById(blogId);
    if(!blog){
      throw new ApiError(httpStatus.BAD_REQUEST, "No blog found");
    }

    if (!blog.isFavouriteOf.includes(userId)) {
      const updatedBlog = await Blog.findOneAndUpdate({ _id: blogId }, { $push: { isFavouriteOf: userId } }, { new: true })
      await User.findOneAndUpdate({ _id: userId }, { $push: { favouriteBlogs: blogId } }, { new: true })
      return updatedBlog;
    } else {
      const updatedBlog = await Blog.findOneAndUpdate({ _id: blogId }, { $pull: { isFavouriteOf: userId } }, { new: true })
      await User.findOneAndUpdate({ _id: userId }, { $pull: { favouriteBlogs: blogId } }, { new: true })
      return updatedBlog;

    }

  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }

}

module.exports = {
  createBlog,
  getAllBlog,
  updateBlog,
  getSingleBlog,
  deleteBlog,
  favouriteABlog

};
