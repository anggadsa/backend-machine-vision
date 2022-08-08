"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "nama required",
          },
          notEmpty: {
            args: true,
            msg: "nama cannot be empty",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "nama required",
          },
          notEmpty: {
            args: true,
            msg: "nama cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid email format",
          },
          notNull: {
            msg: "Email required",
          },
          notEmpty: {
            args: true,
            msg: "Email cannot be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password required",
          },
          notEmpty: {
            args: true,
            msg: "password cannot be empty",
          },
          len: {
            args: [8, 30],
            msg: "The password length should be between 8 and 30 characters.",
          },
        },
      },
      photo: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (User) => {
          User.password = bcrypt.hashSync(User.password,+process.env.SALT_ROUNDS);
          return User;
        },
      },
    }
  );
  return User;
};
