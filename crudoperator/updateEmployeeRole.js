const { db } = require('../config/connection');
const inquirer = require("inquirer");


// Get employee roles
function getRoles() {
    // Query database
    return new Promise((resolve, reject) => {
      db.query('SELECT title FROM roles', function (err, results) {
        let roleNames = results.map((item) => item.title)
        //let roleNames = results;
        resolve(roleNames);
      })
    })
  }


  // Get employee roles
function getRoles() {
    // Query database
    return new Promise((resolve, reject) => {
      db.query('SELECT title FROM roles', function (err, results) {
        let roleNames = results.map((item) => item.title)
        //let roleNames = results;
        resolve(roleNames);
      })
    })
  }


// Update employee function
function updateEmployeeRole() {

    let updateEmployeeQuestions = [];
  
    let currentRolesPromise = getRoles();
    let currentFullNamesPromise = getNames();
  
    let promises = [currentRolesPromise, currentFullNamesPromise];
    Promise.all(promises)
      .then((data) => {
        let currentRoles = data[0];
        let currentFullNames = data[1];
      })
      .then(() => {
        updateEmployeeQuestions = [
          {
            type: 'list',
            name: 'updateEmployee',
            message: "Which Employee would you like to update?",
            choices: currentFullNames
          },
          {
            type: 'list',
            name: 'updateEmployeeRole',
            message: "What Role does the Employee now belongs to?",
            choices: currentRoles
          }];
  
        inquirer.prompt(updateEmployeeQuestions)
          .then((answers) => {
  
            let namesArray = answers.updateEmployee.split(" ")
            
            let thisEmployeeRoleId= 1+ currentRoles.indexOf(answers.newEmployeeRole);
            
            let queryPromise = new Promise((resolve, reject) => {
              db.query(`UPDATE employees SET role_id = ${thisEmployeeRoleId} WHERE first_name = ? AND last_name=?`, namesArray, (err, result) => {
                if (err) {
                  console.log(err);
                }
                resolve(console.log("Successfully updates an employee"));
              })
            })
          })
      })
  }

  module.exports= { updateEmployeeRole };