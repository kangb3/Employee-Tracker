'use strict';


const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'employee_trackerdb'
});

connection.connect();

connection.query = util.promisfy(connection.query);

module.exports = connection;