"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("chatLogs");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.createTable("chatLogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  }
};
