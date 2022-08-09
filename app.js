const express = require("express");
const path = require("path");
const multer = require("multer");
const logger = require("morgan");

// Router
const usersRouter = require("./routes/user.routes");
const postRouter =  require("./routes/post.routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/post", postRouter);

module.exports = app;
