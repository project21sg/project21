module.exports = router => {
  router.prefix("/api/v1");
  router.use("/patients", require("./patients"));
};
