var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootie",
  database: "p21_main"
});

connection.connect(function(err) {
  if (err) {
    console.log("Can't connect to mysqldb:server; retrying in 2 minutes");
    console.log(err);
    //cannot resuse old connection instances
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "rootie",
      database: "p21_main"
    });

    setTimeout(
      () =>
        connection.connect(function(err) {
          console.log("retried mysqldb");
          if (err) {
            console.log(err);
            var connection = mysql.createConnection({
              host: "mysql",
              user: "root",
              password: "rootie",
              database: "p21_main"
            });
            connection.connect(function(err) {
              if (err) {
                console.log(
                  "Can't connect to local docker mysqldb:server; check mysql config and connections"
                );
                console.log(err);
              } else {
                console.log("local mysqldb server connected");
              }
            });
          }
        }),
      72000
    );
  }
});

module.exports = connection;
