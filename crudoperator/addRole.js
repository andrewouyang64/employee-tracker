const { db } = require('../config/connection');
const inquirer = require("inquirer");


// Add role function
function addRole() {
    // List of departments
    let listOfDepartments = [];
    let addRoleQuestions = [];
    let queryPromise = new Promise((resolve, reject) => {
      db.query('SELECT name FROM departments', function (err, results) {
    
        listOfDepartments = results.map((item) => item.name)
  
        resolve(console.log(listOfDepartments));
      })
    }).then(() => {
      addRoleQuestions = [{
        type: 'input',
        name: 'newRoleTitle',
        message: "What is the title of the Role",
      },
      {
        type: 'input',
        name: 'newRoleSalary',
        message: "What is the Salary of the Role",
      },
      {
        type: 'list',
        name: 'newRoleDepartment',
        message: "What is the Department the Role belongs to?",
        choices: listOfDepartments
      }];
  
      inquirer.prompt(addRoleQuestions)
        .then((answers) => {
            let RoleToDepartmentId= 1+ listOfDepartments.indexOf(answers.newRoleDepartment);

                 
          let queryPromise = new Promise((resolve, reject) => {
            db.query(`INSERT INTO Roles (title, salary, department_id)
            VALUES
                ( "${answers.newRoleTitle}", ${answers.newRoleSalary}, ${RoleToDepartmentId});`, (err, result) => {
              if (err) {
                console.log(err);
              }
              resolve(console.log("Successfully adds a role"));
            })
          })
        })
    })
  }

  module.exports = { addRole };