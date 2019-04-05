module.exports = router => {
  router.prefix("/v1");
  router.use("/patients", require("./patients"));
};
