const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PASSWORD,
  database: "employees_tracking_db",
});

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

//Main Menu Table

const mainMenuTable = () =>
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "menuList",
      choices: [
        "Add an employee",
        "Add a department",
        "Add a role",
        "View departments",
        "View roles",
        "View employees",
      ],
    },
  ]);

//Inquirer to build an employee

const buildEmployee = () =>
  inquirer.prompt([
    {
      type: "input",
      message: "First name:",
      name: "firstName",
    },
    {
      type: "input",
      message: "Last name:",
      name: "lastName",
    },
    {
      type: "list",
      message: "Role ID:",
      name: "roleId",
      choices: [1],
    },
    {
      type: "list",
      message: "Manager ID:",
      name: "managerId",
      choices: [1],
    },
  ]);

//Inquirer to build a department

const buildDepartment = () =>
  inquirer.prompt([
    {
      type: "input",
      message: "Department Name:",
      name: "deptName",
    },
  ]);

//Inquirer to build a role

  const buildRole = () =>
  inquirer.prompt([
    {
      type: "input",
      message: "Role Title:",
      name: "roleTitle",
    },
    {
        type: "list",
        message: "Salary:",
        name: "salary",
        choices:[50000,55000,60000,70000,90000,100000,150000,200000]
      },
      {
        type: "list",
        message: "Department ID:",
        name: "departmentId",
        choices:[1,2]
      },
  ]);

mainMenuTable()
  .then((response) => {
    console.log(response.menuList);

    //If user selects 'View departments' a list of all added departments will be visible

    if (response.menuList === "View departments") {
      const sqlCommand = "SELECT * FROM department ORDER BY id ASC";
      connection.query(sqlCommand, (err, result) => {
        if (err) throw err;
        console.table(result);
      });
    }

//If user selects 'View roles' a list of all added roles will be visible

    if (response.menuList === "View roles") {
      const sqlCommand = "SELECT * FROM role ORDER BY id ASC";
      connection.query(sqlCommand, (err, result) => {
        if (err) throw err;
        console.table(result);
      });
    }

//If user selects 'View employees' a list of all added employees will be visible

    if (response.menuList === "View employees") {
      const sqlCommand = "SELECT * FROM employee ORDER BY id ASC";
      connection.query(sqlCommand, (err, result) => {
        if (err) throw err;
        console.table(result);
      });
    }

//If user selects 'Add an employee' they will be prompted to add employee information which will be added to the employee list

    if (response.menuList === "Add an employee") {
      buildEmployee().then((response) => {
        const sqlCommand = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('${response.firstName}','${response.lastName}','${response.roleId}','${response.managerId}')`;
        connection.query(sqlCommand, (err, result) => {
          if (err) throw err;
        });
      });
    }

//If user selects 'Add a department' they will be prompted to add department information which will be added to the department list

    if (response.menuList === "Add a department") {
      buildDepartment().then((response) => {
        const sqlCommand = `INSERT INTO department (name) VALUES ('${response.deptName}')`;
        connection.query(sqlCommand, (err, result) => {
          if (err) throw err;
        });
      });
    }

//If user selects 'Add a role' they will be prompted to add role information which will be added to the role list

    if (response.menuList === "Add a role") {
        buildRole().then((response) => {
          const sqlCommand = `INSERT INTO role (title,salary,department_id) VALUES ('${response.roleTitle}','${response.salary}','${response.departmentId}')`;
          connection.query(sqlCommand, (err, result) => {
            if (err) throw err;
          });
        });
      }
  })
  .catch((err) => console.error(err));
