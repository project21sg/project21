"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("patients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      nric: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      contact: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.STRING
      },
      occupation: {
        type: Sequelize.STRING
      },
      maritalStatus: {
        type: Sequelize.STRING
      },
      knownHealthIssues: {
        type: Sequelize.STRING
      },
      nokName: {
        type: Sequelize.STRING
      },
      nokRelation: {
        type: Sequelize.STRING
      },
      nokAddress: {
        type: Sequelize.STRING
      },
      nokContact: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable("patients");
  }
};
