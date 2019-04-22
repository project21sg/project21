const { medicalRecord } = require("../../../models");

const insertOne = async ctx => {
  const patientId = ctx.request.body.patientId;
  if (!patientId) {
    ctx.status = 400;
    ctx.body = "PatientId not specified.";
    return;
  }

  const data = ctx.request.body.data;
  if (!data) {
    ctx.status = 400;
    ctx.body = "No payload.";
    return;
  }

  data.patientId = patientId;
  const result = medicalRecord.create(data);
  ctx.body = result.id;
};

module.exports = {
  insertOne
};
