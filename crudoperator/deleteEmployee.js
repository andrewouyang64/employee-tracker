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

// Delete employee function
function deleteEmployee() {

    let deleteEmployeeQuestion = [];
  
    let currentFullNamesPromise = getNames();
  
    let promises = [currentFullNamesPromise];
    Promise.all(promises)
      .then((data) => {
        let currentFullNames = data[0];
      })
      .then(() => {
        deleteEmployeeQuestion = [
          {
            type: 'list',
            name: 'deleteEmployee',
            message: "Which Employee would you like to delete?",
            choices: currentFullNames
          }];
  
        inquirer.prompt(deleteEmployeeQuestion)
          .then((answers) => {
  
            let namesArray = answers.deleteEmployee.split(" ")
            //let thisFirstName = namesArray[0];
            //let thisLastName = namesArray[1];
            let queryPromise = new Promise((resolve, reject) => {
              
              db.query("DELETE FROM employees WHERE first_name =? AND last_name=?", namesArray , (err, result) => {
                if (err) {
                  console.log(err);
                }
                resolve(console.log("Successfully deletes a employee"));
              })
            })
          })
        })
  }

  module.exports = { deleteEmployee };