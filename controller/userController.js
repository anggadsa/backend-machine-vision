const { token } = require("morgan");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const foundUsername = await User.findOne({ where: { username: username } });
    const foundEmail = await User.findOne({ where: { email: email } });
    if (foundEmail || foundUsername) throw new Error(`Username or Email has been created`);
    const splitUrl = req.file.path.split("\\");
    const url = splitUrl[splitUrl.length - 1];
    const photo = `${process.env.PATH_URL}${url}`;
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
      data: {
        email: email,
        username: username,
        name: name,
        photo: photo,
      },
    });
  } catch (error) {
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
      data: null
      });
  }
}

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
    console.log(jwt_payload)
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
    const updateData = {
      password: newPassword,
    };
    const foundUser = await User.findByPk(jwt_payload.id);
    const isValidPassword = bcrypt.compareSync(oldPassword, foundUser.password);
    if(isValidPassword) {
      await User.update(updateData, {
        where: { username: jwt_payload.username }, individualHooks: true
      });
    } else {
      throw new Error('Invalid Password')
    }
    console.log('Compare password = ' + isValidPassword);
    return res.status(201).json({
      success: true,
      message: "Successfully Change Password",
      data: null
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};



module.exports = {
  register,
  login,
  logout,
  getUserId,
  updateUser,
  updatePassword,
};
