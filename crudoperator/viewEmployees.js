const { db } = require('../config/connection');

function viewEmployees() {
    // Query database
    let queryPromise = new Promise((resolve, reject) => {
      db.query('SELECT * FROM employees', function (err, results) {
        resolve(console.table(results));
      })
    })
};

module.exports = {viewEmployees};
