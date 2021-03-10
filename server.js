const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const app = express();
const cTable = require('console.table');


const PORT = process.env.PORT || 8080;

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

  app.get('/employee', (req,res)=>{
      const sqlCommand = 'SELECT * FROM employee ORDER BY id ASC';
      connection.query(sqlCommand,(err,result)=>{
          if (err) throw err;
          console.table(result);
      })
  });

  app.get('/role', (req,res)=>{
    const sqlCommand = 'SELECT * FROM role ORDER BY id ASC';
    connection.query(sqlCommand,(err,result)=>{
        if (err) throw err;
        console.table(result);
    })
});

app.get('/department', (req,res)=>{
    const sqlCommand = 'SELECT * FROM department ORDER BY id ASC';
    connection.query(sqlCommand,(err,result)=>{
        if (err) throw err;
        console.table(result);
    })
});

  //=============================================================
  app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);