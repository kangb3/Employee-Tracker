const inquirer = require("inquirer");
//const logo = require("asciiart-logo");
const prompts = require("./prompts");
const db = require("./db/queries");
require("console.table");


async function main() {
    console.log("\n Please select an action \n");
    const { action } = await inquirer.prompt(prompts.mainPrompt);
  
    switch (action) {
      case "viewAllEmployees":
        viewAllEmployees();
        break;

      case "viewAllEmpByRole":
        viewAllEmpByRole();
        break;

      case "viewAllEmpByDept":
        viewAllEmpByDept();
        break;

      case "viewAllEmpManager":
        viewAllEmpManager();
        break;

      case "addEmployee":
        addEmployee();
        break;

      case "addRole":
        addRole();
        break;

      case "addNewDepartment":
        addNewDepartment();
        break;

      case "updateEmployee":
        updateEmployee();
        break;

      case "updateEmployeeRole":
        updateEmployeeRole();
        break;

      case "updateEmpManager":
        updateEmpManager();
        break;

      case "deleteEmployee":
        deleteEmployee();
        break;

      case "deleteRole":
        deleteRole();
        break;

      case "deleteDepartment":
        deleteDepartment();
        break;

      case "viewSalaries":
        viewSalaries();
        break;

      case "exit":
        exit();
        break;
    }
  }

  async function viewAllEmployees() {
    const allEmployees = await db.viewAllEmployees();
  
    console.log("\n");
    console.log("All employees in the company");
    console.table(allEmployees);
    console.log("\n");
  
    main();
  }

  main();