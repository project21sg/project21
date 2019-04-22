require("dotenv").config(); // load .env vars
const { SERVER_PORT, LOG_LEVEL } = process.env;
const fs = require("fs");
const Koa = require("koa");
const logger = require("koa-morgan");
const Router = require("koa-router");
const bodyparser = require("koa-bodyparser");
const onerror = require("koa-onerror");
const cors = require("koa2-cors");

const app = new Koa();

// middlewares
onerror(app);
app.use(cors());
app.use(
  bodyparser({
    detectJSON: function(ctx) {
      return /\.json$/i.test(ctx.path);
    },
    extendTypes: {
      json: ["application/x-javascript"] // will parse application/x-javascript type body as a JSON string
    }
  })
);

// logger
const accessLogStream = fs.createWriteStream(__dirname + "/access.log", {
  flags: "a"
});
app.use(logger(LOG_LEVEL || "combined", { stream: accessLogStream }));

// routes
const router = new Router();
require("./routes")(router);
app.use(router.routes());

// start server
app.listen(SERVER_PORT, async function() {
  console.log(`server listening at port ${SERVER_PORT}`);
});

// console.log(router.stack.map(i => i.path)); // logs all routes
