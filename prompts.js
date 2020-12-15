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


    addEmployeePrompt: [
        {
          name: "first_name",
          type: "input",
          message: "what is the new employee's first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "what is the new employee's last name?",
        },
      ],



      addNewRole: [
        {
          name: "title",
          type: "input",
          message: "What is the name of this new title?",
        },
        {
          name: "salary",
          type: "input",
          message: "what is the salary of this new title?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return "Please enter a number.";
          },
        },
      ],
      addNewDept: [
        {
          name: "name",
          type: "input",
          message: "What is the name of the new department?",
        },
      ],



      updateEmployeePrompt: [
        {
          name: "first_name",
          type: "input",
          message: "what is the employee's new first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "what is the employee's new last name?",
        },
      ],


      confirmAction: [
        {
          name: "confirm",
          type: "list",
          message: "Please confirm the action.",
          choices: ["NO", "YES"],
        },
      ],
    }; 
    
    module.export 
