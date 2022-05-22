const { db } = require('../config/connection');
const inquirer = require("inquirer");


// Add employee function
function addEmployee() {

    let addEmployeeQuestions = [];
  
    let RolesPromise = getRoles();
    let FullNamesPromise = getNames();
  
    let promises = [RolesPromise, FullNamesPromise];
    Promise.all(promises)
      .then((data) => {
        let currentRoles = data[0];
        let currentFullNames = data[1];
      })

      .then(() => {
        addEmployeeQuestions = [{
          type: 'input',
          name: 'newEmployeefirst_name',
          message: "What is the first_name of the Employee",
        },
        {
          type: 'input',
          name: 'newEmployeelast_name',
          message: "What is the last_name of the Employee",
        },
        {
          type: 'list',
          name: 'newEmployeeRole',
          message: "What is the Role the Employee belongs to?",
          choices: currentRoles
        },
        {
          type: 'list',
          name: 'newEmployeeManager',
          message: "What is the Manager the Employee belongs to?",
          choices: currentFullNames
        }];
  
        inquirer.prompt(addEmployeeQuestions)
          .then((answers) => {
  
            
            let thisEmployeeRoleId= 1+ currentRoles.indexOf(answers.newEmployeeRole);
            let thisEmployeeManagerId=1+ currentFullNames.indexOf(answers.newEmployeeManager);
    
            
            let queryPromise = new Promise((resolve, reject) => {
              db.query(`INSERT INTO Employees (first_name, last_name, role_id, manager_id)
          VALUES
              ( "${answers.newEmployeefirst_name}","${answers.newEmployeelast_name}" ,${thisEmployeeRoleId}, ${thisEmployeeManagerId});`, (err, result) => {
                if (err) {
                  console.log(err);
                }
                resolve(console.log("Succesfully adds an employee"));
              })
            })
          })
      })
  }
  
  module.exports = { addEmployee };