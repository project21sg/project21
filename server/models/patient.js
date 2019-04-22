"use strict";
module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define(
    "patient",
    {
      name: DataTypes.STRING,
      nric: DataTypes.STRING,
      gender: DataTypes.STRING,
      dateOfBirth: DataTypes.DATE,
      contact: DataTypes.STRING,
      address: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      occupation: DataTypes.STRING,
      maritalStatus: DataTypes.STRING,
      knownHealthIssues: DataTypes.STRING,
      nokName: DataTypes.STRING,
      nokRelation: DataTypes.STRING,
      nokAddress: DataTypes.STRING,
      nokContact: DataTypes.STRING
    },
    {}
  );
  patient.associate = function(models) {
    patient.hasMany(models.medicalRecord);
  };
  return patient;
};
