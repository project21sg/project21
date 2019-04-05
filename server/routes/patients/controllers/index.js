const { findAll } = require("./get");

module.exports = router => {
  router.get("/", findAll);
};
