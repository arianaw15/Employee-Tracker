const cTable = require('console.table');
const inquirer = require('inquirer');

const employeeTableBuild = ()=>
inquirer.prompt([
    {
        type: 'list',
            message: 'What would you like to do?',
            name: 'menuList',
            choices: ['Add an employee','Add a deparment', 'Add a role','View departments', 'View roles','View employees','Update employee roles']
    },
])

const buildEmployee = () =>
inquirer.prompt([
    {
        type: 'input',
        message: 'First name:',
        name: 'firstName',  
    },
    {
        type: 'input',
        message: 'Last name:',
        name: 'lastName',  
    },
])

employeeTableBuild()
.then((response) => console.log(JSON.stringify(response.menuList)))
.then((response)=> {
    if(JSON.stringify(response.menuList) === 'Add an employee'){
buildEmployee()
    }
})
.catch((err) => console.error(err))










// Const Table


// var employee = [
//     ["Account Management","Senior Program Manager",100000.00,1,"Ariana","Winters",1]
// ]
// console.table([{
//     Department_Name: "Account Mangement",
//     Title: "Senior Program Manager",
//     Salary: 100000.00,
//     Department_ID: 1,
//     First_Name: "Ariana",
//     Last_Name: "Winters",
//     Role_ID: 1,
//     Manager_ID: 1
// }]);
