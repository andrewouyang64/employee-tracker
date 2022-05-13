// Import and require express, mysql2 and inquirer
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'employee_db'
  },
    console.log(`Connected to the employee_db database.`)
  );

  // Query database
db.query('SELECT * FROM emplpyee', function (err, results) {
    console.log(results);
  });