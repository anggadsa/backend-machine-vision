const express = require("express");
const router = express.Router();
const multer = require("multer");
const postRoute = require("../controller/postController");
// const strict = require("../misc/passport");
const strict = require("../misc/jwtVerify")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/post");
  },
  filename: (req, file, cb) => {
    const index = file.originalname.split(".").length;
    cb(null, Date.now() + "." + file.originalname.split(".")[index - 1]);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      return cb(null, true);
    }
  },
});

router.post("/", strict, upload.single("image"), postRoute.createPost)

module.exports = router;
