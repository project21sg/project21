const { patient } = require("../../../models");

// return list of patient ids deleted
const patchOne = async ctx => {
  console.log(ctx.request.body);
  const result = await patient.update(ctx.request.body, {
    where: { id: ctx.params.id }
  });
  ctx.body = result == 1; // true if updated
};

module.exports = {
  patchOne
};
