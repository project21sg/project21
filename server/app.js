require("dotenv").config(); // load .env vars
const { SERVER_PORT } = process.env;
const Koa = require("koa");
const Router = require("koa-router");
const mongo = require("koa-mongo");

const app = new Koa();
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

const router = new Router();

require("./routes")(router);
app.use(router.routes());

app.listen(SERVER_PORT, async function() {
  console.log(`server listening at port ${SERVER_PORT}`);
});

// console.log(router.stack.map(i => i.path)); // logs all routes
