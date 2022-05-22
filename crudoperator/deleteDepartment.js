const { db } = require('../config/connection');
const inquirer = require("inquirer");



// Delete department function
function deleteDepartment() {
    // List of current departments
    let listOfDepartments = [];
    let deleteDepartmentQuestions = [];
    let queryPromise = new Promise((resolve, reject) => {
      db.query('SELECT name FROM departments', function (err, results) {

        listOfDepartments = results.map((item) => item.name)
        resolve(console.log(listOfDepartments));
      })
    }).then(() => {
      deleteDepartmentQuestions = [
        {
          type: 'list',
          name: 'deleteDepartmentName',
          message: "Which department do you want to delete?",
          choices: listOfDepartments
        }];

    }).then(() => {
      inquirer.prompt(deleteDepartmentQuestions)
        .then((answers) => {
          let queryPromise = new Promise((resolve, reject) => {
            db.query(`DELETE FROM departments WHERE name = ?`, answers.deleteDepartmentName, (err, result) => {
              if (err) {
                console.log(err);
              }
              resolve(console.log("Successfully deletes a department"));
            })
          })
        })
    })
  }
  
  module.exports = { deleteDepartment };