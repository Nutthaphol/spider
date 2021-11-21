const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root123",
  database: process.env.MYSQL_DATABASE || "spiderDB",
});
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root123",
//   database: "spiderDB",
// });

connection.connect();

module.exports = connection;
