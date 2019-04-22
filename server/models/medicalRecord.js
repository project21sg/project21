"use strict";
module.exports = (sequelize, DataTypes) => {
  const medicalRecord = sequelize.define(
    "medicalRecord",
    {
      name: DataTypes.STRING,
      tugDuration: DataTypes.INTEGER,
      recentFalls: DataTypes.INTEGER,
      medications: DataTypes.INTEGER,
      psychological: DataTypes.INTEGER,
      cognitiveStatus: DataTypes.INTEGER,
      AMTS: DataTypes.INTEGER,
      riskFactor: DataTypes.INTEGER,
      derivedStepRatio: DataTypes.INTEGER,
      derivedStepSymmetry: DataTypes.INTEGER,
      derivedGaitSpeed: DataTypes.INTEGER,
      derivedFallRiskScore: DataTypes.INTEGER
    },
    {}
  );
  medicalRecord.associate = function(models) {
    medicalRecord.belongsTo(models.patient);
    medicalRecord.hasMany(models.gaitDataPoint);
  };
  return medicalRecord;
};
