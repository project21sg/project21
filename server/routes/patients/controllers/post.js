const { patient } = require("../../../models");

// return list of patient ids deleted
const insertOne = async ctx => {
  const result = patient.create(ctx.request.body);
  ctx.body = result.id;
};

module.exports = {
  insertOne
};
