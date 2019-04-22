const { medicalRecord } = require("../../../models");

const findAll = async ctx => {
  const medicalRecordId = ctx.request.body.medicalRecordId;
  if (!medicalRecordId) {
    ctx.status = 400;
    ctx.body = "MedicalRecordId not specified.";
    return;
  }

  const medicalRecordFound = await medicalRecord.findOne({
    where: { id: patientId }
  });
  if (!medicalRecordFound) {
    ctx.status = 400;
    ctx.body = "MedicalRecord not found.";
    return;
  }

  const getGaitDataPoints = await medicalRecordFound.getGaitDataPoints();
  ctx.body = getGaitDataPoints;
};

module.exports = {
  findAll
};
