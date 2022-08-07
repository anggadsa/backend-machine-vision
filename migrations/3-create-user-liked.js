'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserLikeds', {
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      }
    })
    .then(() => {
      return queryInterface.addConstraint('UserLikeds', ['postId', 'userId'], {
        type: 'primary key',
        name: 'UserLikeds_pkey'
      });
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserLikeds');
  }
};