const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!Australia2018",
  database: "company_db",
});

connection.connect((err) => {
  if (err) throw err;
});

connection.query = util.promisify(connection.query);



module.exports = connection;
