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
        addEmployeeRole();
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
        updateEmployeeManager();
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

  

  async function viewAllEmpByDept() {
    const deptList = await db.listAllDepartment();
    const deptOption = deptList.map(({ ID, NAME }) => ({
      name: NAME,
      value: ID,
    }));



  const { deptID } = await inquirer.prompt([
    {
        type: "list",
        name: "deptID",
        message: "which department do you want to see?",
        choices: deptOption,
    },
    ]);

    const allEmpByDept = await db.viewAllEmpByDept(deptID);
    console.log("\n");
    console.table(allEmpByDept);
    console.log("\n");
    main();
  }


  async function viewAllEmpByRole() {
    const roleList = await db.viewAllRoles();
    const roleOption = roleList.map(({ ID, TITLE }) => ({
      name: TITLE,
      value: ID,
    }));


   const { roleID } = await inquirer.prompt([
    {
        type: "list",
        name: "roleID",
        message: "which role do you want to pull?",
        choices: roleOption,
    },
    ]);


    const allEmpByRole = await db.viewAllEmpByRole(roleID);
    console.log("\n");
    console.table(allEmpByRole);
    console.log("\n");
    main();
    }


    async function viewAllEmpManager() {
        const managerList = await db.viewAllManagers();
        const managerOption = managerList.map(({ ID, FULL_NAME }) => ({
          name: FULL_NAME,
          value: ID,
        }));

    
    if (managerList.length !== 0) {
        const { manID } = await inquirer.prompt([
            {
            type: "list",
            name: "manID",
            message: "which manager's team do you want to pull?",
            choices: managerOption,
            },
        ]);
      

    const allEmpByManager = await db.viewAllManagers(manID);

    if (allEmpByManager.length !== 0) {
        console.log("\n");
        console.table(allEmpByManager);
        console.log("\n");
        main();
    } else {
        console.log("\n This manager doesn't have a team.");
        main();
    }
    } else {
    console.log("There is no manager. Please add one.");
    main();
    }
}


async function addEmployee() {
    const roleList = await db.viewAllRoles();
    const roleOption = roleList.map(({ ID, TITLE }) => ({
      name: TITLE,
      value: ID,
    }));
  
    const managerList = await db.viewAllManagers();
    const managerOption = managerList.map(({ ID, FULL_NAME }) => ({
      name: FULL_NAME,
      value: ID,
    }));


const empName = await inquirer.prompt(prompts.addEmployeePrompt);

  const newEmpRoleID = await inquirer.prompt([
    {
      name: "role_id",
      type: "list",
      message: "What is the new employee's role?",
      choices: roleOption,
    },
  ]);

  var newEmpManID = null;

  if (newEmpRoleID.role_id !== 1 && managerList.length !== 0) {
    newEmpManID = await inquirer.prompt([
      {
        name: "manager_id",
        type: "list",
        message: "who is the manager of this new employee?",
        choices: managerOption,
      },
    ]);

    var newEmpArray = {
        ...empName,
        ...newEmpRoleID,
        ...newEmpManID,
      };


    await db.addEmployee(newEmpArray);

    console.log(
      `Added ${empName.first_name}${empName.last_name} into database`
    );
    main();
  } else if (newEmpRoleID.role_id === 1) {
    var newEmpArray = {
      ...empName,
      ...newEmpRoleID,
    };

    await db.addEmployee(newEmpArray);

    console.log(
      `Added ${empName.first_name}${empName.last_name} into database`
    );
    main();
  }
}


async function addEmployeeRole() {
    const deptartmentList = await db.listAllDepartment();
    const deptartmentOption = deptartmentList.map(({ ID, NAME }) => ({
      name: NAME,
      value: ID,
    }));
    const title = await inquirer.prompt(prompts.addNewRole);


const newDeptartmentID = await inquirer.prompt([
    {
        name: "department_id",
        type: "list",
        message: "which department does this new role belong to?",
        choices: deptartmentOption,
    },
    ]);

var newRoleArray = {
    ...title,
    ...newDeptartmentID,
    };


    await db.addRole(newRoleArray);
    const allRole = await db.viewAllRoles();
    console.log(

      `Added new ${title.title} with salary: ${title.salary} into database`
    );
    console.table(allRole);
  
    main();
  }


  async function addNewDepartment() {

    const deptName = await inquirer.prompt(prompts.addNewDept);
  
    await db.addNewDepartment(deptName);
    const allDept = await db.listAllDepartment();
    console.log(`Added new department: ${deptName.name} into database`);
    console.table(allDept);
  
    main();
  }
  



  async function updateEmployee() {
    
    const employeeList = await db.viewAllEmp();
    console.log(employeeList);
    const employeeOption = employeeList.map(({ ID, FIRST_NAME }) => ({
      name: FIRST_NAME,
      value: ID,
    }));
    console.log(employeeOption);




 const updateEmployeeID = await inquirer.prompt([
    {
        name: "ID",
        type: "list",
        message: "Which employee do want to update?",
        choices: employeeOption,
    },
    ]);

const getName = await inquirer.prompt(prompts.updateEmployeePrompt);

await db.updateDBEmp(getName, updateEmployeeID);
console.log(
    `The employee's name has been updated to: ${getName.first_name}${getName.last_name}.`
);
    main();
}


async function updateEmployeeRole() {
    const employeeList = await db.viewAllEmp();
    const employeeOption = employeeList.map(({ ID, FULL_NAME }) => ({
      name: FULL_NAME,
      value: ID,
    }));
    
    
    const roleList = await db.viewAllRoles();
    const roleOption = roleList.map(({ ID, TITLE }) => ({
      name: TITLE,
      value: ID,
    }));



const managerSchemaName = await db.getManagerSchema();
const schemaID = managerSchemaName.map(({ ID }) => ({
    role_id: ID,
}));


const updateEmployeeRole = await inquirer.prompt([
    {
      name: "ID",
      type: "list",
      message: "Which employee do you want to update?",
      choices: employeeOption,
    },
  ]);



const updateRoleID = await inquirer.prompt([
{
    name: "role_id",
    type: "list",
    message: "Which title should be updated to this employee?",
    choices: roleOption,
},
]);





const roleArray = {
    ...updateEmployeeRole,
    ...updateRoleID,
  };


if (JSON.stringify(updateRoleID) === JSON.stringify(schemaID[0])) {
await db.removeManagerID(updateEmployeeRole);
await db.updateEmployeeRole(roleArray);
console.log(`The employee's title has been updated.`);
main();
} 
else {
await db.updateEmployeeRole(roleArray);
console.log(`The employee's title has been updated.`);
main();
    }
}


async function updateEmployeeManager() {n
    const employeeList = await db.viewAllEmp();
    const employeeOption = employeeList.map(({ ID, FULL_NAME }) => ({
      name: FULL_NAME,
      value: ID,
    }));
    const managerList = await db.viewAllManagers();
    const managerOption = managerList.map(({ ID, FULL_NAME }) => ({
      name: FULL_NAME,
      value: ID,
    }));


if (managerList.length !== 0) {
    const updateEmployeeManagerInfo = await inquirer.prompt([
        {
        name: "ID",
        type: "list",
        message: "Which employee do want to update?",
        choices: employeeOption,
        },
        {
        name: "manager_id",
        type: "list",
        message: "Which manager should this employee be under?",
        choices: managerOption,
        },
    ]);


    await db.updateEmployeeManager(updateEmployeeManagerInfo);
    console.log(`The employee has been moved to a new manager.`);
    main();
  }
  console.log("There is no manager in the company. Please add a new manager.");
  main();
}



async function deleteEmployee() {
    const employeeList = await db.viewAllEmp();
    const employeeOption = employeeList.map(({ ID, FULL_NAME }) => ({
      name: FULL_NAME,
      value: ID,
    }));
  
    const deleteEmployeeInfo = await inquirer.prompt([
      {
        name: "ID",
        type: "list",
        message: "Which employee do you want to delete?",
        choices: employeeOption,
      },
    ]);


    const confirmAction = await inquirer.prompt(prompts.confirmAction);

    if (confirmAction.confirm === "YES") {
      await db.deleteEmployee(deleteEmployeeInfo);
      console.log(
        `The employee with ID: ${deleteEmployeeInfo.ID} has been removed from..`
      );
      main();
    } 
    else {
      main();
    }
  }



  async function deleteRole() {
    const roleList = await db.viewAllRoles();
    const roleOption = roleList.map(({ ID, TITLE }) => ({
      name: TITLE,
      value: ID,
    }));

    const deleteRoleInfo = await inquirer.prompt([
      {
        name: "role_id",
        type: "list",
        message: "Which role do you want to delete?",
        choices: roleOption,
      },
    ]);



    const confirmAction = await inquirer.prompt(prompts.confirmAction);

    if (confirmAction.confirm === "YES") {
      await db.deleteRole(deleteRoleInfo);
      console.log(
        `The title with Role_ID: ${deleteRoleInfo.role_id} has been removed from the database.`
      );
      const newRoleList = await db.viewAllRoles();
      console.log("\n");
      console.table(newRoleList);
      console.log("\n");
      main();
    } else {
      main();
    }
  }



  async function deleteDepartment() {
    const departmentList = await db.listAllDepartment();
    const departmentOption = departmentList.map(({ ID, NAME }) => ({
      name: NAME,
      value: ID,
    }));
  
    const deleteDepartmentInfo = await inquirer.prompt([
      {
        type: "list",
        name: "department_id",
        message: "which department do you want to delete from the database",
        choices: departmentOption,
      },
    ]);
  

    const confirmAction = await inquirer.prompt(prompts.confirmAction);

    if (confirmAction.confirm === "YES") {
      await db.deleteDepartment(deleteDepartmentInfo);
      console.log(
        `The department with department_ID: ${deleteDepartmentInfo.department_id} has been removed from the database.`
      );
      const newDepartmentList = await db.listAllDepartment();
      console.log("\n");
      console.table(newDepartmentList);
      console.log("\n");
      main();
    } else {
      main();
    }
  }



  async function viewSalaries() {
    const departmentList = await db.listAllDepartment();
    const departmentOption = departmentList.map(({ ID, NAME }) => ({
      name: NAME,
      value: ID,
    }));
    const totalDepartmentBudget = await inquirer.prompt([
      {
        type: "list",
        name: "department_id",
        message: "Which department do you want to view? ",
        choices: departmentOption,
      },
    ]);



    const leadbudget = await db.viewSalaries(totalDepartmentBudget);
  if (leadbudget.length !== 0) {
    console.log("\nThe total salary of this department is: \n");
    console.table(leadbudget);
    console.log("\n");
    main();
  } else {
    console.log("There is no employee in this department. Total salary is 0");
    main();
  }
}

async function exit() {
    console.log("\n You have existed Employee Tracker.\n");
    process.exit(1);
  }
  
  main();



