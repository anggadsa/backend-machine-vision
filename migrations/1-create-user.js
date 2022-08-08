"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
<<<<<<< HEAD
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
=======
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
>>>>>>> 11c6e2f8f7ec77244adc038c3f2cb32209ebf31b
      },
      password: {
        type: Sequelize.STRING,
      },
      photo: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
