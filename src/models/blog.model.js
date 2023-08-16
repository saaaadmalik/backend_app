const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    postedDate: {
      type: Date,
      default: new Date(),
    },
    featureImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
