const { patient } = require("../../../models");

const findAll = async ctx => {
  const patientId = ctx.request.body.patientId;
  if (!patientId) {
    ctx.status = 400;
    ctx.body = "PatientId not specified.";
    return;
  }

  const patientFound = await patient.findOne({ where: { id: patientId } });
  if (!patientFound) {
    ctx.status = 400;
    ctx.body = "Patient not found.";
    return;
  }

  const medicalRecords = await patientFound.getMedicalRecords();
  ctx.body = medicalRecords;
};

module.exports = {
  findAll
};
