const findAll = async ctx => {
  const result = await ctx.db.collection("users").insert({ name: "haha" });
  const userId = result.ops[0]._id.toString();
  ctx.body = await ctx.db
    .collection("users")
    .find()
    .toArray();
  ctx.db.collection("users").remove({
    _id: mongo.ObjectId(userId)
  });
};

module.exports = {
  findAll
};
