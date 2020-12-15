const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }


  //Query to see all employees
  viewAllEmployees() {
    return this.connection.query(
      `
            SELECT 
                EMP.ID,
                EMP.first_name as 'First name',
                EMP.last_name as 'Last name',
                ER.title as 'Title',
                ER.salary as 'Salary',
                DEP.name as 'Department',
                CONCAT(man.first_name, ' ', man.last_name) as 'Manager'

            FROM 
                employee AS MAN
            RIGHT JOIN
                employee AS EMP
                ON MAN.id = EMP.manager_id
            INNER JOIN 
                empRole AS ER
                ON EMP.ROLE_ID = ER.id
            INNER JOIN  
                department AS DEP  
                ON ER.department_id = DEP.id
            ORDER BY 
                EMP.ROLE_ID
        `
    );
  }


  listAllDepartment() {
    return this.connection.query(
      `
        SELECT 
          ID, 
          NAME 
        FROM 
          DEPARTMENT

        `
    );
  }


  viewAllEmpByDept(deptID) {
    return this.connection.query(
      `
      SELECT 
        EMP.first_name as 'First name',
        EMP.last_name as 'Last name',
        ER.title as 'Title',
        ER.salary as 'Salary',
        DEP.name as 'Department',
        CONCAT(man.first_name, ' ', man.last_name) as 'Manager'

      FROM 
        employee AS MAN
      RIGHT JOIN
        employee AS EMP
        ON MAN.id = EMP.manager_id
      INNER JOIN 
        empRole AS ER
        ON EMP.ROLE_ID = ER.id
      INNER JOIN  
        department AS DEP  
        ON ER.department_id = DEP.id
      WHERE 
        DEP.ID = ?
      `,
      deptID
    );
  }



  viewAllRoles() {
    return this.connection.query(
      `
            SELECT 
              ID, 
              TITLE
            FROM 
              EMPROLE
            
    
            `
    );
  }



  viewAllEmpByRole(roleID) {
    return this.connection.query(
      `
      SELECT 
        EMP.first_name as 'First name',
        EMP.last_name as 'Last name',
        ER.title as 'Title',
        ER.salary as 'Salary',
        DEP.name as 'Department',
        CONCAT(man.first_name, ' ', man.last_name) as 'Manager'

    FROM 
      employee AS MAN
    RIGHT JOIN
      employee AS EMP
      ON MAN.id = EMP.manager_id
    INNER JOIN 
      empRole AS ER
      ON EMP.ROLE_ID = ER.id
    INNER JOIN  
      department AS DEP  
      ON ER.department_id = DEP.id
    WHERE 
      ER.ID = ?
        `,
      roleID
    );
  }




  viewAllManagers() {
    return this.connection.query(
      `
      SELECT 
      EMP.ID AS 'ID',
      CONCAT(EMP.FIRST_NAME, ' ', EMP.LAST_NAME) as 'FULL_NAME'
    FROM 
      EMPLOYEE AS EMP
    INNER JOIN
      EMPROLE AS RO
    ON EMP.ROLE_ID = RO.ID
    WHERE
      RO.TITLE = 'Manager'
    
            `
    );
  }




  viewAllEmp() {
    return this.connection.query(
      `
              SELECT 
                ID,
                CONCAT(FIRST_NAME, ' ', LAST_NAME) as 'FULL_NAME'
              FROM 
                EMPLOYEE
      
              `
    );
  }

  viewAllEmpManager(manID) {
    
    return this.connection.query(
      `
      SELECT
        M.ID,
        CONCAT(M.first_name, ' ', M.last_name) as 'EMP',
        CONCAT(E.first_name, ' ', E.last_name) as 'Manager'

      FROM
        EMPLOYEE as E
      RIGHT JOIN
        EMPLOYEE as M
      ON E.ID = M.MANAGER_ID
      INNER JOIN 
        EMPROLE AS RO
      ON E.ROLE_ID = RO.ID
      WHERE 
        RO.TITLE = "Manager"
        AND 
        E.ID = ?
      `,
      manID
    );
  }



  
  addEmployee(newEmpArray) {
    return this.connection.query(
      `

        INSERT INTO 
          EMPLOYEE
        SET ?
        `,
      newEmpArray
    );
  }




 
  addRole(newRoleArray) {
    return this.connection.query(
      `

      INSERT INTO
        EMPROLE
      SET ?
      `,
      newRoleArray
    );
  }




  
  addNewDepartment(deptName) {
    return this.connection.query(
      `
      INSERT INTO
        DEPARTMENT
      SET ?
      `,
      deptName
    );
  }


  


  updateEmployee(getName, updateEmpID) {
    console.log("checking " + getName.first_name);
    return this.connection.query(
      `
      UPDATE
        EMPLOYEE
      SET
        FIRST_NAME = '${getName.first_name}',
        LAST_NAME = '${getName.last_name}'
      WHERE
        ID = ${updateEmpID.ID}
        `
    );
  }




  
  updateEmployeeRole(roleInfoArray) {
    return this.connection.query(
      `
      UPDATE
        EMPLOYEE
      SET
        role_id = ${roleInfoArray.role_id}
      WHERE
        ID = ${roleInfoArray.ID}
        `
    );
  }


   


   updateEmployeeManager(updateEmpManagerInfo) {
    return this.connection.query(
      `
      UPDATE
        EMPLOYEE
      SET
        manager_id = ${updateEmpManagerInfo.manager_id}
      WHERE
        ID = ${updateEmpManagerInfo.ID}
        `
    );
  }




  
  deleteEmployee(delEmpInfo) {
    return this.connection.query(
      `
      DELETE 
      FROM 
        EMPLOYEE 
      WHERE 
        ID = ${delEmpInfo.ID};

      `
    );
  }




  
  deleteRole(delRoleInfo) {
    return this.connection.query(
      `
        DELETE 
        FROM 
          EMPROLE 
        WHERE 
          ID = ${delRoleInfo.role_id};
  
        `
    );
  }




   
   deleteDepartment(delDeptInfo) {
    return this.connection.query(
      `
        DELETE 
        FROM 
          DEPARTMENT 
        WHERE 
          ID = ${delDeptInfo.department_id};
        `
    );
  }




  viewSalaries(totalDeptBudget) {
    return this.connection.query(
      `
        SELECT
          DEP.name as 'Department',
          SUM(ER.SALARY) as 'Total_Salary'

        FROM 
          employee AS MAN
        RIGHT JOIN
          employee AS EMP
          ON MAN.id = EMP.manager_id
        INNER JOIN 
          empRole AS ER
          ON EMP.ROLE_ID = ER.id
        INNER JOIN  
          department AS DEP  
          ON ER.department_id = DEP.id
        WHERE
          DEP.ID = ${totalDeptBudget.department_id}
        GROUP BY DEP.ID
   `
    );
  }




  getManagerSchema() {
    return this.connection.query(
      `
      SELECT
        ID,
        TITLE
      FROM 
        EMPROLE
      WHERE
        TITLE = 'Manager'

    `
    );
  }





  removeManagerID(updateDBEmpRole) {
    return this.connection.query(
      `
      UPDATE
        EMPLOYEE
      SET
        MANAGER_ID = NULL
      WHERE
        ID = ${updateDBEmpRole.ID}
      `
    );
  }

}



module.exports = new DB(connection);