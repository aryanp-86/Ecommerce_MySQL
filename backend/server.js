const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  database: "ecommerce_management",
  user: "root",
  password: "8612",
});

connection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("MySQL Database is connected Successfully");
  }
});

module.exports = connection;
