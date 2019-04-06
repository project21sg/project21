require("dotenv").config(); // load .env vars
const { SERVER_PORT, LOG_LEVEL } = process.env;
const fs = require("fs");
const Koa = require("koa");
const logger = require("koa-morgan");
const Router = require("koa-router");
const mongo = require("koa-mongo");

const app = new Koa();

// logger
const accessLogStream = fs.createWriteStream(__dirname + "/access.log", {
  flags: "a"
});
app.use(logger(LOG_LEVEL || "combined", { stream: accessLogStream }));

// databases
// app.use(
//   mongo({
//     host: "localhost",
//     port: 27017,
//     user: "admin",
//     pass: "admin",
//     db: "p21-mongo"
//   })
// );
app.use(mongo({ uri: "mongodb://127.0.0.1:27017" }));

// routes
const router = new Router();
require("./routes")(router);
app.use(router.routes());

// start server
app.listen(SERVER_PORT, async function() {
  console.log(`server listening at port ${SERVER_PORT}`);
});

// console.log(router.stack.map(i => i.path)); // logs all routes
