const { token } = require("morgan");
const { User } = require("../models");
<<<<<<< HEAD
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
=======
>>>>>>> 11c6e2f8f7ec77244adc038c3f2cb32209ebf31b

const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
<<<<<<< HEAD
    const foundUsername = await User.findOne({ where: { username: username } });
    const foundEmail = await User.findOne({ where: { email: email } });
    if (foundEmail || foundUsername)
      throw new Error(`Username or Email has been created`);
    const splitUrl = req.file.path.split("\\");
    const url = splitUrl[splitUrl.length - 1];
    const photo = `${process.env.PATH_URL}${url}`;
=======
    const splitUrl = req.file.path.split("\\");
    const url = splitUrl[splitUrl.length - 1];
    const photo = `C:/Users/asus/OneDrive/Desktop/angga/backend-machine-vision/public/images/${url}`;
>>>>>>> 11c6e2f8f7ec77244adc038c3f2cb32209ebf31b
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
<<<<<<< HEAD
      data: {
        email: email,
        username: username,
        name: name,
        photo: photo,
      },
    });
  } catch (error) {
    console.log(error);
=======
      data: userData,
    });
  } catch (error) {
>>>>>>> 11c6e2f8f7ec77244adc038c3f2cb32209ebf31b
    return res.status(400).json({
      success: false,
      message: "Your account cannot be created",
      data: null,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ where: { username: username } });
    if (foundUser) {
      // Check profile
      const isValidPassword = bcrypt.compareSync(password, foundUser.password);
<<<<<<< HEAD
      console.log(isValidPassword);
=======
>>>>>>> 11c6e2f8f7ec77244adc038c3f2cb32209ebf31b
      if (isValidPassword) {
        const payload = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
<<<<<<< HEAD
          expiresIn: "100s",
        });
        return res.status(200).json({
          success: true,
          message: "Sukses mengakses endpoint",
          data: {
            token: token,
          },
        });
      } else {
        throw new Error("Wrong email or password");
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const logout = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ where: { username: username } });
    if (foundUser) {
      // Check profile
      const isValidPassword = bcrypt.compareSync(password, foundUser.password);
      console.log(isValidPassword);
      if (isValidPassword) {
        const payload = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "15m",
        });
        return res.status(200).json({
          success: true,
          message: "Successfully logout",
          data: null,
        });
      } else {
        throw new Error("Invalid Token");
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null,
=======
          expiresIn: "1h",
        });
      }
    }
    return res.status(200).json({
      success: true,
      message: "Sukses mengakses endpoint",
      data: {
        token: token,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Gagal mengakses endpoint",
>>>>>>> 11c6e2f8f7ec77244adc038c3f2cb32209ebf31b
    });
  }
};

<<<<<<< HEAD
const getUserId = async (req, res) => {
  const id = req.body.id;
  const options = {
    attributes: {
      exclude: ["id"],
    },
  };
  const cariUser = await User.findByPk(id, options);
  if (cariUser) {
    return res.status(200).json({
      status: "Success",
      data: cariUser,
    });
  } else if (!cariUser) {
    return res.status(400).json({
      success: false,
      message: `Data not found`,
      data: null
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, username, photo } = req.body;
    const jwt_payload = req.user;
    // console.log(req.user);
    const updateData = {
      name: name,
      email: email,
      username: username,
      photo: photo,
    };
    const foundUser = await User.findByPk(jwt_payload.id);
    if (foundUser) {
      const updateUser = await User.update(updateData, {
        where: {
          id: jwt_payload.id,
        },
      });
      const reloadData = await foundUser.reload();
      return res.status(201).json({
        success: true,
        message: "Successfully Update User",
        data: {
          name: reloadData.name,
          username: reloadData.username,
          email: reloadData.email,
          photo: reloadData.photo,
          createdAt: reloadData.createdAt,
          updateData: reloadData.updatedAt,
        },
      });
    } else {
      throw new Error(`Cannot update user`);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const jwt_payload = req.user;
    const foundUser = await User.findOne({
      where: { username: jwt_payload.username },
    });
    const isValidPassword = bcrypt.compareSync(oldPassword, foundUser.password);
    console.log(jwt_payload);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
=======
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
>>>>>>> 11c6e2f8f7ec77244adc038c3f2cb32209ebf31b

module.exports = {
  register,
  login,
<<<<<<< HEAD
  logout,
  getUserId,
  updateUser,
  updatePassword,
=======
  getImage,
>>>>>>> 11c6e2f8f7ec77244adc038c3f2cb32209ebf31b
};
