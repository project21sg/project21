const { patient } = require("../../../models");

const insertOne = async ctx => {
  const result = patient.create(ctx.request.body);
  ctx.body = result.id;
};

module.exports = {
  insertOne
};
