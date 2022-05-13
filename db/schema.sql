DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT,
  first_name TEXT,
  last_name TEXT,
  role_id INT NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  manager_id INT NOT NULL,
  ON DELETE SET NULL
);