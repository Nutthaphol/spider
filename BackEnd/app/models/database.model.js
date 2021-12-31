const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root123",
  database: process.env.MYSQL_DATABASE || "spiderDB",
});
// const connection = mysql.createConnection({
//   host: "x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
//   user: "jrq4y6jia1gyr0h5",
//   password: "kyi6i5bur8ec60y4",
//   database: "vb0vgm4oorlu3yiw",
// });

connection.connect();

module.exports = connection;
