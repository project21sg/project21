"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface
        .createTable(
          "gaitDataPoints",
          {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
            },
            ax: {
              type: Sequelize.FLOAT(5)
            },
            ay: {
              type: Sequelize.FLOAT(5)
            },
            az: {
              type: Sequelize.FLOAT(5)
            },
            gx: {
              type: Sequelize.FLOAT(7)
            },
            gy: {
              type: Sequelize.FLOAT(7)
            },
            gz: {
              type: Sequelize.FLOAT(7)
            },
            time: {
              type: Sequelize.DOUBLE
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
        .then(() => {
          // gaitDataPoint belongs to medicalRecords
          return queryInterface.addColumn(
            "gaitDataPoints", // name of Source model
            "medicalRecordId", // name of the key we're adding
            {
              type: Sequelize.INTEGER,
              references: {
                model: "medicalRecords", // name of Target model
                key: "id" // key in Target model that we're referencing
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL"
            },
            { transaction: t }
          );
        })
        .then(() => {
          // medicalRecords hasMany gaitDataPoints
          return queryInterface.addColumn(
            "medicalRecords", // name of Source model
            "gaitDataPointId", // name of the key we're adding
            {
              type: Sequelize.INTEGER,
              references: {
                model: "gaitDataPoints", // name of Target model
                key: "id" // key in Target model that we're referencing
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL"
            },
            { transaction: t }
          );
        });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface
        .removeColumn(
          "medicalRecords", // name of Source model
          "gaitDataPointId", // key we want to remove
          { transaction: t }
        )
        .then(() =>
          queryInterface.dropTable("gaitDataPoints", { transaction: t })
        );
    });
  }
};
