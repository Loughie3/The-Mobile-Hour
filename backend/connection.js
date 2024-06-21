const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 4306,
  user: "Manager",
  password: "@**iEa[nDmgz/]0D",
  database: "the_mobile_hour",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Server!");
});

module.exports = connection; // This exports the connection object
