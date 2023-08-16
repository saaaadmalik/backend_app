const express = require("express");
const { requireSignin, authMiddleware } = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const blogValidation = require("../validations/blog.validation");
const { blogController } = require("../controllers");
const { fileUpload } = require("./../utils/fileUpload");
const router = express.Router();

router
  .route("/")
  .post(
    fileUpload.single("featureImage"),
    requireSignin,
    authMiddleware,
    [validate(blogValidation.createBlog)],
    blogController.createBlog
  )
  .get(requireSignin, authMiddleware, blogController.getAllBlog);
router
  .route("/:blogId")
  .patch(
    fileUpload.single("featureImage"),
    requireSignin,
    authMiddleware,
    [validate(blogValidation.updateBlog)],
    blogController.updateBlog
  )
  .get(
    requireSignin,
    authMiddleware,
    [validate(blogValidation.getSingleBlog)],
    blogController.getSingleBlog
  )
  .delete(
    requireSignin,
    authMiddleware,
    [validate(blogValidation.getSingleBlog)],
    blogController.deleteBlog
  );
router
  .route("/top/four/blogs")
  .get(requireSignin, authMiddleware, blogController.topFourBlogs);
router
  .route("/random/blogs")
  .get(requireSignin, authMiddleware, blogController.randomBlogs);
module.exports = router;
