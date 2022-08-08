const express = require("express");
const router = express.Router();
const multer = require("multer");
const userRoute = require("../controller/userController");
<<<<<<< HEAD
const strict = require("../misc/passport");
=======
>>>>>>> 11c6e2f8f7ec77244adc038c3f2cb32209ebf31b

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

<<<<<<< HEAD
router.post("/login", userRoute.login);
router.post("/logout", userRoute.logout);
router.post("/register", upload.single("photo"), userRoute.register);
router.get("/", userRoute.getUserId);
router.put("/", strict, upload.single("photo"), userRoute.updateUser);
router.put("/change-password", strict, userRoute.updatePassword);

// router.post("/", restrict, upload.single("photo"), userRoute.post);
// router.get("/public/:url", userRoute.getImage);
=======
router.get("/login", userRoute.login);
router.post("/register", upload.single("photo"), userRoute.register);
router.get("/public/:url", userRoute.getImage);
>>>>>>> 11c6e2f8f7ec77244adc038c3f2cb32209ebf31b

module.exports = router;
