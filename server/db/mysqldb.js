var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'p21_main'
});

connection.connect( function(err) {
  if(err) {
    console.log("Can't connect to mysqldb:server; connecting to local mysql server...")
  }
  console.log("mysqldb Connected.")
});

module.exports = connection;