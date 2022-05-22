const { db } = require('../config/connection');

// View department function
function viewDepartments() {
    // Query database
    let queryPromise = new Promise((resolve, reject) => {
      db.query('SELECT * FROM departments', function (err, results) {
        resolve(console.table(results));
      })
    })
    
  }

  module.exports = { viewDepartments };