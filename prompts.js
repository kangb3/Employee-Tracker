const db = require('./db');
const inquirer = require('inquirer');




module.exports = {
    mainPrompt: [
      {
        name: "action",
        type: "list",
        message: "What do you want to do?",
        choices: [
          {
            name: "View all employees",
            value: "viewAllEmployees",
          },
          {
            name: "View all employees by role",
            value: "viewAllEmpByRole",
          },
          {
            name: "View all employees by department",
            value: "viewAllEmpByDept",
          },
          {
            name: "View all employees by manager",
            value: "viewAllEmpManager",
          },
          {
            name: "Add new employee",
            value: "addEmployee",
          },
          {
            name: "Add new title",
            value: "addRole",
          },
          {
            name: "Add new department",
            value: "addNewDepartment",
          },
          {
            name: "Update employee name",
            value: "updateEmployee",
          },
          {
            name: "Update employee title",
            value: "updateEmployeeRole",
          },
          {
            name: "Update employee manager",
            value: "updateEmpManager",
          },
          {
            name: "Delete employee",
            value: "deleteEmployee",
          },
          {
            name: "Delete role",
            value: "deleteRole",
          },
          {
            name: "Delete department",
            value: "deleteDepartment",
          },
          {
            name: "View department budgets",
            value: "viewSalaries",
          },
          {
            name: "Exit",
            value: "exit",
          },
        ],
      },
    ],

}