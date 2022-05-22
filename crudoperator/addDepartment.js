
const { db } = require('../config/connection');
const inquirer = require("inquirer");



// Add department function
function addDepartment() {
    const addDepartmentQuestions = [{
      type: 'input',
      name: 'newDepartmentName',
      message: "What is the name of the department",
    }];
  
    inquirer.prompt(addDepartmentQuestions)
      .then((answer) => {
        let queryPromise = new Promise((resolve, reject) => {
        db.query(`INSERT INTO departments (name) VALUES ("${answer.newDepartmentName}");`, (err, result) => {
            
        if (err) {
              console.log(err);
            }
            resolve(console.log("Successfully adds a department"));
          })
        })
    })
  
  }

  module.exports = { addDepartment };