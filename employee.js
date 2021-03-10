const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    // Be sure to update with your own MySQL password!
    password: 'Coggy0501!',
    database: 'employees_tracking_db',
  });

  connection.connect((err) => {
    if (err) {
      console.error(`error connecting: ${err.stack}`);
      return;
    }
    console.log(`connected as id ${connection.threadId}`);
  });

const mainMenuTable = ()=>
inquirer
.prompt([{
    type: 'list',
    message: 'What would you like to do?',
    name: 'menuList',
    choices: ['Add an employee', 'Add a deparment', 'Add a role', 'View departments', 'View roles', 'View employees', 'Update employee roles']
}, ])

const buildEmployee = ()=>
inquirer.prompt([{
        type: 'input',
        message: 'First name:',
        name: 'firstName',
    },
    {
        type: 'input',
        message: 'Last name:',
        name: 'lastName',
    },
    {
        type: 'list',
        message: 'Department:',
        name: 'department',
        choices: ['Account Management',]
    },
    {
        type: 'list',
        message: 'Manager:',
        name: 'manager',
        choices: ['Ariana Winters',]
    },

])


mainMenuTable()
.then((response)=> {
    console.log(response.menuList);
    if((response.menuList) === 'Add an employee'){
buildEmployee()
    };
    if((response.menuList) === 'View departments'){
            const sqlCommand = 'SELECT * FROM department ORDER BY id ASC';
            connection.query(sqlCommand,(err,result)=>{
                if (err) throw err;
                console.table(result);
        });
    };
    if((response.menuList) === 'View roles'){
        const sqlCommand = 'SELECT * FROM role ORDER BY id ASC';
    connection.query(sqlCommand,(err,result)=>{
        if (err) throw err;
        console.table(result);
    });
};
if((response.menuList) === 'View employees'){
    const sqlCommand = 'SELECT * FROM employee ORDER BY id ASC';
      connection.query(sqlCommand,(err,result)=>{
          if (err) throw err;
          console.table(result);
});
};
})
.catch((err) => console.error(err))



// employeeTableBuild()
// .then((response) => console.log(JSON.stringify(response.menuList)))
// .then((response) => {
//     if(JSON.stringify(response) === 'Add an employee'){
//         buildEmployee()
//         .then((response) => console.log(response))
//     };
// })
// .catch((err) => console.error(err))