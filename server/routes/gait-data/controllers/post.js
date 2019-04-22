const { gaitDataPoint } = require("../../../models");

const insertOne = async ctx => {
  const medicalRecordId = ctx.request.body.medicalRecordId;
  if (!medicalRecordId) {
    ctx.status = 400;
    ctx.body = "MedicalRecordId not specified.";
    return;
  }

  const data = ctx.request.body.data;
  if (!data) {
    ctx.status = 400;
    ctx.body = "No payload.";
    return;
  }

  data.medicalRecordId = medicalRecordId;
  const result = await gaitDataPoint.create(data); //for each point, bulkInsert

  ctx.body = result.id;
};

module.exports = {
  insertOne
};
