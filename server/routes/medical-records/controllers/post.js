const { medicalRecord, gaitDataPoint } = require("../../../models");

const insertOne = async ctx => {
  const patientId = ctx.request.body.data.patientId;
  if (!patientId) {
    ctx.status = 400;
    ctx.body = "PatientId not specified.";
    return;
  }

  const { gaitData, ...data } = ctx.request.body.data; // UNSCALABLE! gaitData likely to overgrow json limits
  if (!data || !gaitData) {
    ctx.status = 400;
    ctx.body = "No payload.";
    return;
  }

  data.patientId = patientId;
  const mrResult = await medicalRecord.create(data);

  // parse out gaitData: ax, ay, az, gx, gy, gz, time
  const parsedGaitData = gaitData.map(dp => {
    return {
      ax: dp[0],
      ay: dp[1],
      az: dp[2],
      gx: dp[3],
      gy: dp[4],
      gz: dp[5],
      time: dp[6],
      medicalRecordId: mrResult.id
    };
  });
  await gaitDataPoint.bulkCreate(parsedGaitData);

  // do derivation calculations here?
  const derivedData = {
    derivedStepRatio: 30,
    derivedStepSymmetry: 45,
    derivedGaitSpeed: 25,
    derivedFallRiskScore: 14
  };

  await medicalRecord.update(derivedData, {
    where: { id: mrResult.id }
  });

  ctx.body = mrResult.id;
};

module.exports = {
  insertOne
};
