"use strict";
/*
  factors are numerized for easier data processing.
*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface
        .createTable(
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
        )
        .then(
          () => {
            // medicalRecords belongsTo patient
            return queryInterface
              .addColumn(
                "medicalRecords", // name of Source model
                "patientId", // name of the key we're adding
                {
                  type: Sequelize.INTEGER,
                  references: {
                    model: "patients", // name of Target model
                    key: "id" // key in Target model that we're referencing
                  },
                  onUpdate: "CASCADE",
                  onDelete: "SET NULL"
                },
                { transaction: t }
              )
              .then(() => {
                // patient hasMany medicalRecords
                return queryInterface.addColumn(
                  "patients",
                  "medicalRecordId",
                  {
                    type: Sequelize.INTEGER,
                    references: {
                      model: "medicalRecords",
                      key: "id"
                    },
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL"
                  },
                  { transaction: t }
                );
              });
          },
          { transaction: t }
        );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface
        .removeColumn(
          "patients", // name of Source model
          "medicalRecordId", // key we want to remove
          { transaction: t }
        )
        .then(() =>
          queryInterface.dropTable("medicalRecords", { transaction: t })
        );
    });
  }
};
