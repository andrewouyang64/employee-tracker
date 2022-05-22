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


// Delete role function
function deleteRole() {
    let currentRoles = [];
    let deleteQuestion = [];
    getRoles().then((answers) => {
      currentRoles = answers
    }).then(() => {
      deleteQuestion = [
        {
          type: 'list',
          name: 'deleteRole',
          message: "What is the Role you want to delete?",
          choices: currentRoles
        }];
  
    }).then(() => {
      inquirer.prompt(deleteQuestion)
        .then((answers) => {
          let queryPromise = new Promise((resolve, reject) => {
            db.query(`DELETE FROM roles WHERE title = ?`, answers.deleteRole, (err, result) => {
              if (err) {
                console.log(err);
              }
              resolve(console.log("Successfully deletes a role"));
            })
          })
        })
  
    })
  }
  
  module.exports = { deleteRole };