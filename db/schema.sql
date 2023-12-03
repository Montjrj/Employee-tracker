DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  department_name VARCHAR(30) NOT NULL

);

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  title VARCHAR(30)NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id) on DELETE CASCADE 

);

CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  title VARCHAR(30)NOT NULL,
  role_id INT,
  department_id INT,
  Salary DECIMAL NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id) on DELETE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee(id) on DELETE SET NULL

);
