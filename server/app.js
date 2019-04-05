require("dotenv").config(); // load .env vars
const { SERVER_PORT } = process.env;
const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

require("./routes")(router);
app.use(router.routes());

app.listen(SERVER_PORT, function() {
  console.log(`server listening at port ${SERVER_PORT}`);
});

console.log(router.stack.map(i => i.path));
