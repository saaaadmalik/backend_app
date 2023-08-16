const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: (req, file, cb) => {
    // eslint-disable-next-line prefer-template
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/PNG" ||
    file.mimetype === "image/JPG" ||
    file.mimetype === "image/JPEG"
  ) {
    cb(null, true);
  } else {
    return cb(new Error("Only image allowed"), false);
  }
};

const fileUpload = multer({ storage, fileFilter });

module.exports = {
  fileUpload,
};
