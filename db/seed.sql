USE company_db;


/*Departments*/
INSERT INTO department (name)
VALUES("Leadership");
INSERT INTO department (name)
VALUES("Technology");
INSERT INTO department (name)
VALUES("Finance");


/*Roles*/
INSERT INTO empRole (title, salary, department_id)
VALUES("Manager", 170000, 1);
INSERT INTO empRole (title, salary, department_id)
VALUES("Engineer", 130000, 2);
INSERT INTO empRole (title, salary, department_id)
VALUES("Analysis", 110000, 3);

/*Employee data*/
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Ron", "Swanson", 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Leslie", "Knope", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Andy", "Dwyer", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Ann", "Perkins", 2, 1);