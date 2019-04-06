"use strict";
/*
  factors are numerized for easier data processing.
*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("medicalRecords", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tugDuration: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      recentFalls: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      medications: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      psychological: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cognitiveStatus: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      AMTS: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      riskFactor: {
        allowNull: false,
        type: Sequelize.INTEGER
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("medicalRecords");
  }
};
