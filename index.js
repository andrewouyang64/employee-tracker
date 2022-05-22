//Import modules
const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require('mysql2');
const { db } = require('./config/connection');
const { features } = require("process");



//Crud features function lists

//1.  Views employees
const { viewEmployees } = require('./crudoperator/viewEmployees.js');

//2.  Views roles
const { viewRoles } = require('./crudoperator/viewRoles.js'); 

// 3.  Views department
const { viewDepartments } = require('./crudoperator/viewDepartments.js');

// 4.  Adds employee
const { addEmployee } = require('./crudoperator/addEmployee.js');

// 5.  Adds role
const { addRole } = require('./crudoperator/addRole.js');

// 6.  Adds department
const { addDepartment } = require('./crudoperator/addDepartment.js');

// 7.  Updates employee role
const { updateEmployeeRole } = require('./crudoperator/updateEmployeeRole.js');

//8. Deletes department
const { deleteDepartment } = require('./crudoperator/deleteDepartment.js');

// 9. Deletes role
const { deleteRole } = require('./crudoperator/deleteRole.js');

// 10. Deletes employee
const { deleteEmployee } = require('./crudoperator/deleteEmployee.js');



// Prints out app title
console.log(`Connected to the tracker_db database.`)
console.log('== E M P L O Y E E    M A N A G E R ==');
 

// Tracker function
  function Tracker() {

    // Ask the inquirer questions
    const mainQuestions = [
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'mainChoice',
        choices: ['View Employees', 'Add Employee', 'Update Employee Role', "Delete Employee", 'View Roles', 'Add Role', "Delete Role", 'View Departments', 'Add Department', "Delete Department", 'Quit']
      }
    ];

    inquirer
      .prompt(mainQuestions)
      .then((answers) => {

        // User's Choice and run the related module function
        switch (answers.mainChoice) {
          case 'View Employees':
            viewEmployees();
            break;
          case 'Add Employee':
            addEmployee();
            break;
          case 'Update Employee Role':
            updateEmployeeRole();
            break;
          case 'View All Roles':
            viewRoles();
            break;
          case 'Add Role':
            addRole();
            break;
          case 'View Departments':
            viewDepartments();
            break;
          case 'Add Department':
            addDepartment();
            break;
          case 'Delete Department':
            deleteDepartment();
            break;
          case 'Delete Role':
            deleteRole();
            break;
          case 'Delete Employee':
            deleteEmployee();
            break;
          case 'Quit':
            quit();
            break;
        
        }
      })
  }


  // Exits the node app
  function quit() {

    console.log("*Thank you for using Empolyee Manager!*");
    process.exit();
  }

//}

Tracker();