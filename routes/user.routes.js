const express = require("express");
const router = express.Router();
const multer = require("multer");
const userRoute = require("../controller/userController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
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

router.get("/login", userRoute.login);
router.post("/register", upload.single("photo"), userRoute.register);
router.get("/public/:url", userRoute.getImage);

module.exports = router;
