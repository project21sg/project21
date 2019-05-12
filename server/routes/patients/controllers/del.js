const { patient } = require("../../../models");

// return list of patient ids deleted
const destroyAll = async ctx => {
  const allPatients = await patient.findAll();
  const ids = await Promise.all(
    Object.values(allPatients).map(async patient => {
      await patient.destroy(ctx);
      return patient.id;
    })
  );
  ctx.body = ids;
};

const destroyOne = async ctx => {
  const patientToDelete = await patient.findOne({
    where: { id: ctx.params.id }
  });
  await patientToDelete.destroy(ctx);
  ctx.body = patientToDelete.id;
};

module.exports = {
  destroyAll,
  destroyOne
};
