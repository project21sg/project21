const { patient, medicalRecord, gaitDataPoint } = require("../../../models");

const findAll = async ctx => {
  const patientId = ctx.request.body.patientId;
  if (!patientId) {
    ctx.status = 400;
    ctx.body = "PatientId not specified.";
    return;
  }

  const patientFound = await patient.findOne({
    where: { id: patientId },
    include: [
      {
        model: medicalRecord,
        include: [
          {
            model: gaitDataPoint
          }
        ]
      }
    ]
  });
  if (!patientFound) {
    ctx.status = 400;
    ctx.body = "Patient not found.";
    return;
  }

  const medicalRecords = patientFound.medicalRecords;
  ctx.body = medicalRecords;
};

module.exports = {
  findAll
};
