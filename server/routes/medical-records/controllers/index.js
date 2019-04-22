const { findAll } = require("./get");
// const { destroyAll, destroyOne } = require("./del");
// const { insertOne } = require("./post");
// const { patchOne } = require("./patch");

module.exports = router => {
  router.get("/", findAll);
  // router.get("/:id", findOne);
  //   router.del("/", destroyAll);
  //   router.del("/:id", destroyOne);
  //   router.post("/", insertOne);
  //   router.patch("/:id", patchOne);
};
