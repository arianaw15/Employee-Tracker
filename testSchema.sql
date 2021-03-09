-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS employees_tracking_db;

-- Created the DB "employees_tracking_db" (only works on local connections)
CREATE DATABASE employees_tracking_db;

-- Use the DB employees_tracking_db for all the rest of the script
USE employees_tracking_db;

-- Created the table "department"
CREATE TABLE department (
  id int(10) AUTO_INCREMENT NOT NULL,
  name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO department (name)
VALUES ("Account Management");

INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO department (name)
VALUES ("IT");

INSERT INTO department (name)
VALUES ("Developers");


-- Created the table "role"

CREATE TABLE role (
  id int(10) AUTO_INCREMENT NOT NULL,
  title varchar(30) NOT NULL,
  salary DECIMAL  NOT NULL,
  department_id INT(10) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO role (title,salary,department_id)
VALUES ("Senior Program Manager","$100000.00",1);

INSERT INTO role (title,salary,department_id)
VALUES ("Program Manager","$75000.00",1);

INSERT INTO role (title,salary,department_id)
VALUES ("Marketing Manager","$150000.00",2);

INSERT INTO role (title,salary,department_id)
VALUES ("Marketing Specialist","$75000.00",2);

INSERT INTO role (title,salary,department_id)
VALUES ("Social Media Marketing Manager","$80000.00",2);

INSERT INTO role (title,salary,department_id)
VALUES ("Technical Product Manager","$150000.00",4);

INSERT INTO role (title,salary,department_id)
VALUES ("Senior Full Stack Developer","$100000.00",4);

INSERT INTO role (title,salary,department_id)
VALUES ("Entry Level Full Stack Developer","$60000.00",4);

-- Created the table "employee"
CREATE TABLE employee (
  id int(10) AUTO_INCREMENT NOT NULL,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id INT(10) NOT NULL,
  manager_id INT(10) NOT NULL,
  PRIMARY KEY(id)
);

-- Inserted a set of records into the table
INSERT INTO employees (first_name,last_name,role_id,manager_id)
VALUES ("Ariana","Winters",1,1);