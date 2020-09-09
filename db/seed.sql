-- Departments
INSERT INTO department(name) values('Information Services');
INSERT INTO department(name) values('Finance');
INSERT INTO department(name) values('Parks & Recreation');

-- roles 
INSERT INTO roles(title, salary, department_id) values('IT Manager', 100000.00, 1);
INSERT INTO roles(title, salary, department_id) values('IT Analyst 1', 60000.00, 1);
INSERT INTO roles(title, salary, department_id) values('IT Analyst 2', 70000.00, 1);

INSERT INTO roles(title, salary, department_id) values('Finance Manager', 100000.00, 2);
INSERT INTO roles(title, salary, department_id) values('Accountant', 85000.00, 2);

INSERT INTO roles(title, salary, department_id) values('Parks Manager', 100000.00, 3);
INSERT INTO roles(title, salary, department_id) values('Maintenance Worker', 55000.00, 3);
INSERT INTO roles(title, salary, department_id) values('City Engineer', 75000.00, 3);


-- employees
INSERT INTO employee(first_name, last_name, role_id) values('Joe', 'Johnson', 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) values('Michael', 'Krewson', 2, 1);

INSERT INTO employee(first_name, last_name, role_id) values('Aubrey', 'Plaza', 4);
INSERT INTO employee(first_name, last_name, role_id, manager_id) values('Angela', 'Martin', 5, 2);

INSERT INTO employee(first_name, last_name, role_id) values('Leslie', 'Knope', 6);
INSERT INTO employee(first_name, last_name, role_id, manager_id) values('Jerry', 'Gergich', 7, 4);
INSERT INTO employee(first_name, last_name, role_id) values('Ron', 'Swanson', 8);