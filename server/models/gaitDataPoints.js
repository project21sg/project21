"use strict";
module.exports = (sequelize, DataTypes) => {
  const gaitDataPoint = sequelize.define(
    "gaitDataPoint",
    {
      ax: DataTypes.FLOAT(5),
      ay: DataTypes.FLOAT(5),
      az: DataTypes.FLOAT(5),
      gx: DataTypes.FLOAT(7),
      gy: DataTypes.FLOAT(7),
      gz: DataTypes.FLOAT(7),
      time: DataTypes.DOUBLE
    },
    {}
  );
  gaitDataPoint.associate = function(models) {
    gaitDataPoint.belongsTo(models.medicalRecord);
  };
  return gaitDataPoint;
};
