var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'mysql',
  user     : 'root',
  password : 'rootie',
  database : 'p21_main'
});

connection.connect( function(err) {
  if(err) {
    console.log("Can't connect to mysqldb:server; connecting to local mysqldb");
    console.log(err)
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'p21_main'
    });
    connection.connect(function(err) {
      console.log("Can't connect to mysqldb:server; check mysql config and connections");
      console.log(err);
    })
  }
});

module.exports = connection;