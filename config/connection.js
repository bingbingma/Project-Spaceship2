// var connection;
// if (process.env.JAWSDB_URL) {
//   connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//   connection = mysql.createConnection({
//     host: "localhost",
//     port: 8889,
//     user: "root",
//     password: "",
//     database: "messages"
//   });
// }

// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// module.exports = connection;

// Dependencies
var Sequelize = require("sequelize");
var mysql = require("mysql");
// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.

// if (process.env.JAWSDB_URL) {
// connection = mysql.createConnection(process.env.JAWSDB_URL);
//   var sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
var sequelize = new Sequelize("messages_db", "root", "", {
  host: "localhost",
  port: 8889,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
// }
// Exports the connection for other files to use
module.exports = sequelize;
