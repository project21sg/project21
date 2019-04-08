const { patient } = require("../../../models");

const findAll = async ctx => {
  ctx.body = await patient.findAll();
};

const findOne = async ctx => {
  ctx.body = await patient.findOne({ id: ctx.params.id });
};

module.exports = {
  findAll,
  findOne
};
