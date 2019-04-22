const Router = require("koa-router");
const router = new Router();

require("./controllers")(router);

module.exports = router.routes();
