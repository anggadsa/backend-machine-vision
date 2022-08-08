const { User } = require("../models");

const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const splitUrl = req.file.path.split("\\");
    const url = splitUrl[splitUrl.length - 1];
    const photo = `C:/Users/asus/OneDrive/Desktop/angga/backend-machine-vision/public/images/${url}`;
    const userData = {
      email: email,
      username: username,
      name: name,
      password: password,
      photo: photo,
    };
    console.log(photo);
    const tambahUser = await User.create(userData);
    return res.status(201).json({
      success: true,
      message: "Your account has been successfully created",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Your account cannot be created",
    });
  }
};

const login = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Sukses mengakses endpoint",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Gagal mengakses endpoint",
    });
  }
};

const getImage = async (req, res) => {
  const imageUrl = req.params.url;
  return console.log(imageUrl);
};

const createPost = async (req, res) => {};

const listPost = async (req, res) => {};

const listPostByUserId = async (req, res) => {};

const getPostById = async (req, res) => {};

const updatePost = async (req, res) => {};

const deletePost = async (req, res) => {};

const like = async (req, res) => {};

const unLike = async (req, res) => {};

const uploadImage = async (req, res) => {};

module.exports = {
  register,
  login,
  getImage,
};
