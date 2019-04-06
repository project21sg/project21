"use strict";
module.exports = (sequelize, DataTypes) => {
  const medicalRecord = sequelize.define(
    "medicalRecord",
    {
      name: DataTypes.STRING,
      dateUploaded: DataTypes.DATE,
      tugDuration: DataTypes.INTEGER,
      recentFalls: DataTypes.INTEGER,
      medications: DataTypes.INTEGER,
      psychological: DataTypes.INTEGER,
      cognitiveStatus: DataTypes.INTEGER,
      AMTS: DataTypes.INTEGER,
      riskFactor: DataTypes.INTEGER
    },
    {}
  );
  medicalRecord.associate = function(models) {
    medicalRecord.belongsTo(models.patient);
  };
  return medicalRecord;
};
