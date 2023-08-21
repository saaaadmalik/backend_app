const express = require("express");
const { requireSignin, blogRestriction } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const blogValidation = require("../validations/blog.validation");
const { blogController } = require("../controllers");
const router = express.Router();

router
  .route("/")
  .post(
    requireSignin,
    [validate(blogValidation.createBlog)],
    blogController.createBlog
  )
  .get(requireSignin, blogController.getAllBlog);

router
  .route("/:blogId")
  .patch(
    requireSignin,
    [validate(blogValidation.updateBlog)],
    blogRestriction("manageBlogs"),
    blogController.updateBlog
  )
  .get(
    requireSignin,
    [validate(blogValidation.getSingleBlog)],
    blogController.getSingleBlog
  )
  .delete(
    requireSignin,
    [validate(blogValidation.getSingleBlog)],
    blogRestriction("manageBlogs"),
    blogController.deleteBlog
  );

router
  .route("/like/:blogId")
  .patch(
    requireSignin,
    [validate(blogValidation.getSingleBlog)],
    blogController.favouriteABlog
  )


module.exports = router;
