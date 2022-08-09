const express = require("express");
const router = express.Router();
const multer = require("multer");
const userRoute = require("../controller/userController");
const strict = require("../misc/passport");
const jwtVerify = require("../misc/jwtVerify")

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

router.post("/login", userRoute.login);
router.post("/logout", userRoute.logout);
router.post("/register", upload.single("photo"), userRoute.register);
router.get("/", userRoute.getUserId);
router.put("/", jwtVerify, upload.single("photo"), userRoute.updateUser);
router.put("/change-password", strict, userRoute.updatePassword);

module.exports = router;
