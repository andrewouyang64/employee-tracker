const { db } = require('../config/connection');

// View roles function
function viewRoles() {
    // Query database
    let queryPromise = new Promise((resolve, reject) => {
      db.query('SELECT * FROM roles', function (err, results) {
        resolve(console.table(results));
      })
    })

  }

  module.exports = { viewRoles };