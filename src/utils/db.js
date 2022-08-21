const mysql = require('mysql2');
const { dbConfig } = require('./constants');

const pool = mysql.createPool(dbConfig);

let createDatabase = "CREATE DATABASE IF NOT EXISTS `" + dbConfig.database + "`";

let createUserTable = `CREATE TABLE IF NOT EXISTS users 
(   id INT AUTO_INCREMENT PRIMARY KEY, 
    fullname VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

pool.query(createDatabase, (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected successfully');
        pool.query(createUserTable);
    }
})


module.exports = pool.promise();