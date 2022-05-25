// Get Libraries
const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require('mysql2');
const { db } = require('./config/connection');
//const { resolve } = require("path");


//Modulized block functions

  //1. View roles function

  function viewRoles () {
    //Query database
    let queryPromise = new Promise((resolve, reject) => {

  db.query('SELECT * FROM roles', function (err, results) {
      
        resolve(console.table(results));
      })
   })

   // Return to main menu
    .then(() => { tracker() })

  }


  //2. View departments
  function viewDepartments() {
    // Query database
    let queryPromise = new Promise((resolve, reject) => {
      db.query('SELECT * FROM departments', function (err, results) {
        resolve(console.table(results));
      })
    })
    // Return to main menu
      .then(() => { tracker() })
  }


  //3. Add employee
  async function addEmployee() {

    // Get current role names & employee names
        currentRoles = await getRoles();
        employeeNames = await getNames();
        let names = employeeNames.map((item)=> item.first_name + ' ' + item.last_name);
        let roleNames = currentRoles.map((item) => item.title)
        
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
          message: "What is the role the Employee belongs to?",
          choices: roleNames
        },
        {
          type: 'list',
          name: 'newEmployeeManager',
          message: "What is the manager the Employee belongs to?",
          choices: names
        }];

        inquirer.prompt(addEmployeeQuestions)
          .then((answer) => {

            //Get matched role id
            let matchRole = currentRoles.find((r)=>r.title===answer.newEmployeeRole);
            let roleId = matchRole.id;
           
            //Get matched manager id
            let matchManager = employeeNames.find((item) => item.first_name + ' ' + item.last_name===answer.newEmployeeManager);
            let managerId = matchManager.id;

            let queryPromise = new Promise((resolve, reject) => {
              db.query(`INSERT INTO Employees (first_name, last_name, role_id, manager_id)
          VALUES
              ( "${answer.newEmployeefirst_name}","${answer.newEmployeelast_name}" ,${roleId}, ${managerId});`, (err, result) => {
                if (err) {
                  console.log(err);
                }
                resolve(result);
              
              })
            
            })
          })
          // Return to main menu
          .then(() => { tracker() })
      //})
        
  }


  //4.Add role
  function addRole() {

    // Get current departments and add role questions
    let departments = [];
    let addRoleQuestions = [];
    let deptNames;

    let queryPromise = new Promise((resolve, reject) => {
      db.query('SELECT * FROM departments', function (err, results) {
        // Make a list of departments
        departments = results;
        deptNames = results.map((item) => item.name);

        resolve(
      
        );
      })
    })
    
    // Add role questions
    .then(() => {
      addRoleQuestions = [{
        type: 'input',
        name: 'newRoleTitle',
        message: "What is the title of the Role",
      },
      {
        type: 'input',
        name: 'newRoleSalary',
        message: "What is the salary of the Role",
      },
      {
        type: 'list',
        name: 'roleToDepartment',
        message: "What is the department the Role belongs to?",
        choices: deptNames
      }];

      inquirer.prompt(addRoleQuestions)
        .then((answer) => {

          //Get department id
          let matchDepartment = departments.find((d)=>d.name===answer.roleToDepartment);
          
          let departmentId = matchDepartment.id;
          
          // query database and add role to it
          let queryPromise = new Promise((resolve, reject) => {
            db.query(`INSERT INTO Roles (title, salary, department_id)
            VALUES
                ( "${answer.newRoleTitle}", ${answer.newRoleSalary}, ${departmentId});`, (err, result) => {
              if (err) {
                console.log(err);
              }
              resolve(result);
            })
          })
        })
        
        // Return to the main options menu
      .then(() => { tracker() })
    })
  }



  //5. Add department
  function addDepartment() {

    // add department questions/inquire for answers
    const addDeptQuestions = [{
      type: 'input',
      name: 'newDeptName',
      message: "What is the name of the department",
    }];

    inquirer.prompt(addDeptQuestions)
      .then((answer) => {
        let queryPromise = new Promise((resolve, reject) => {
          db.query(`INSERT INTO departments (name) VALUES ("${answer.newDeptName}");`, (err, result) => {
            if (err) {
              console.log(err);
            }
            resolve(result);
          })
        })
      })

      // Return to main option menu
      .then(() => { tracker() })

  }


  // 6. Update employee role
  async function updateEmployee() {

    //Get employee name and role name
    currentRoles = await getRoles();
    employeeNames = await getNames();
    let names = employeeNames.map((item)=> item.first_name + ' ' + item.last_name);
    let roleNames = currentRoles.map((item) => item.title)
    
        updateEmployeeQuestions = [
          {
            type: 'list',
            name: 'updateEmployee',
            message: "Which employee would you like to update?",
            choices: names
          },
          {
            type: 'list',
            name: 'updateRole',
            message: "What role does the employee now belongs to?",
            choices: roleNames
          }];

        inquirer.prompt(updateEmployeeQuestions)
          .then((answer) => {

            // Get employee's name array
            let namesArr = answer.updateEmployee.split(" ")

            //Get role id
            let matchRole = currentRoles.find((r)=>r.title===answer.updateRole);
            let roleId = matchRole.id;
           
            let queryPromise = new Promise((resolve, reject) => {
              db.query(`UPDATE employees SET role_id = ${roleId} WHERE first_name = ? AND last_name = ?`, namesArr, (err, result) => {
                if (err) {
                  console.log(err);
                }
                resolve(result);
              })
            })
          })

          //Return to option menu
          .then(() => { tracker() })
      }
  //}


  // 7. Delete employee
  async function deleteEmployee() {

    //Get employee name
    
    let employeeNames = await getNames();
    let names = employeeNames.map((item)=> item.first_name + ' ' + item.last_name);
    
      let deleteEmpQuestion = [
          {
            type: 'list',
            name: 'deleteEmployee',
            message: "Which employee would you like to delete?",
            choices: names
          }];

        inquirer.prompt(deleteEmpQuestion)
          .then((answer) => {

            let namesArr = answer.deleteEmployee.split(" ")
            
            let queryPromise = new Promise((resolve, reject) => {
              
              db.query("DELETE FROM employees WHERE first_name =? AND last_name=?", namesArr , (err, result) => {
                if (err) {
                  console.log(err);
                }
                resolve(result);
              })

            })
          })
          
          // Return to option menu
          .then(() => { tracker() })
      }


  // 8. Delete role
  async function deleteRole() {
    
    //Get role name
    let currentRoles = await getRoles();
    let roleNames = currentRoles.map((item) => item.title)

    //getRoles()
    //.then((data) => {currentRoles = data})
    
    //.then(() => {
    let deleteQuestion = [
        {
          type: 'list',
          name: 'deleteRole',
          message: "What is the role you want to delete?",
          choices: roleNames
        }];

    //}).then(() => {
      inquirer.prompt(deleteQuestion)
      .then((answer) => {
          let queryPromise = new Promise((resolve, reject) => {
            db.query(`DELETE FROM roles WHERE title = ?`, answer.deleteRole, (err, result) => {
              if (err) {
                console.log(err);
              }
              resolve(result);
            })
          })

        })
        // Return back to option menu
        .then(() => { tracker() })

    }


// 9. Get employee role's name

function getRoles() {
  // Query database
  return new Promise((resolve, reject) => {
    const sql = `	SELECT r.id, r.title, d.name AS department, r.salary
    FROM roles AS r
    INNER JOIN departments AS d
    ON r.department_id = d.id
    ORDER BY r.id;`;

    db.query(sql, function (err, results) {
    
      resolve(results);
      //console.log(roleNames)
  })
  })
  }


  // 10. Delete a department
  function deleteDepartment() {
  
    let departments;
    let deleteDeptQuestions;

    let queryPromise = new Promise((resolve, reject) => {
      db.query('SELECT name FROM departments', function (err, results) {
        
        departments = results.map((item) => item.name)
        resolve(results);
      })
    })
    
    .then(() => {
      deleteDeptQuestions = [
        {
          type: 'list',
          name: 'deleteDeptName',
          message: "Which department do you want to delete?",
          choices: departments
        }];
    })
    
    .then(() => {
      inquirer.prompt(deleteDeptQuestions)
        .then((answer) => {

          let queryPromise = new Promise((resolve, reject) => {
            db.query(`DELETE FROM departments WHERE name = ?`, answer.deleteDeptName, (err, result) => {
              if (err) {
                console.log(err);
              }
              resolve(result);
            })
          })

        })
        
        //Return back to option menu
        .then(() => { tracker() })
    })
  }



  // 11. Get employee's name
  function getNames() {

    return new Promise((resolve, reject) => { 
    db.query('SELECT * FROM employees', function (err, results) {
      
      resolve(results);
      
      })
      
    })
 
  }


  
  // 12. View employees

  function viewEmployees() {
    // Query database
    let queryPromise = new Promise((resolve, reject) => {
      const sql = `	SELECT e.id, e.first_name, e.last_name, title, name AS departments, salary, 
          CONCAT(e2.first_name,' ',e2.last_name) AS manager
          FROM employees AS e
          INNER JOIN roles AS r
          ON e.role_id = r.id
          INNER JOIN departments AS d
          ON r.department_id = d.id
          LEFT JOIN employees AS e2
          ON e.manager_id = e2.id
          ORDER BY e.id;`;
      
      db.query(sql, function (err, results) {
      //db.query('SELECT * FROM employees', function (err, results) {
        resolve(console.table(results));
      })
    })
      .then(() => { tracker() })
  }
  
  

// Print application's name and database name
  console.log(`Connected to the tracker_db database.`)
  console.log('== E M P L O Y E E    M A N A G E R ==');
   

// Employee Managment System function
  
  function tracker() {

    // Ask the inquirer questions
    const mainMenuQuestions = [
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'mainMenuChoice',
        choices: ['View Employees', 'Add Employee', 'Update Employee Role', "Delete Employee", 'View Roles', 'Add Role', "Delete Role", 'View Departments', 'Add Department', "Delete Department", 'Quit']
      }
    ];

    inquirer
      .prompt(mainMenuQuestions)
      .then((answer) => {

        // Take the Users Choice and run the corresponding Method/Function
        switch (answer.mainMenuChoice) {
          case 'View Employees':
            viewEmployees();
           
            break;
          case 'Add Employee':
            addEmployee();
           
            break;
          case 'Update Employee Role':
            updateEmployee();
            break;
          case 'View Roles':
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

    console.log("*Thank you for using Empolyee Manager!* \n " );
    process.exit();
  }

//}

tracker();
