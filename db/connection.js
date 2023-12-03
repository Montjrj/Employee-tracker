// creating connection to the mysql database 
// using mysql2 package 
// Import and require mysql2
//const express = require('express');
//const { Module } = require('module');
const mysql = require('mysql2');

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'root123',
    database: 'employee_tracker_db',
  },
  console.log(`Connected to the employee tracker database.`)
);

db.connect(function (err){
  if(err)throw(err)
})

module.exports = db;