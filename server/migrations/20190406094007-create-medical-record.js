"use strict";
/*
  factors are numerized for easier data processing.
*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.createTable(
        "medicalRecords",
        {
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
          derivedStepRatio: {
            allowNull: true,
            type: Sequelize.INTEGER
          },
          derivedStepSymmetry: {
            allowNull: true,
            type: Sequelize.INTEGER
          },
          derivedGaitSpeed: {
            allowNull: true,
            type: Sequelize.INTEGER
          },
          derivedFallRiskScore: {
            allowNull: true,
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
        },
        { transaction: t }
      );
      // medicalRecords belongsTo patient
      return await queryInterface.addColumn(
        "medicalRecords", // name of Source model
        "patientId", // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "patients", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        },
        { transaction: t }
      );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface.dropTable("medicalRecords", { transaction: t });
    });
  }
};
