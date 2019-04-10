"use strict";
module.exports = (sequelize, DataTypes) => {
  const gaitDataPoint = sequelize.define(
    "gaitDataPoint",
    {
      ax: DataTypes.FLOAT(3, 2),
      ay: DataTypes.FLOAT(3, 2),
      az: DataTypes.FLOAT(3, 2),
      gx: DataTypes.FLOAT(5, 2),
      gy: DataTypes.FLOAT(5, 2),
      gz: DataTypes.FLOAT(5, 2),
      time: DataTypes.DOUBLE(20, 8)
    },
    {}
  );
  gaitDataPoint.associate = function(models) {
    gaitDataPoint.belongsTo(models.medicalRecord);
  };
  return gaitDataPoint;
};
