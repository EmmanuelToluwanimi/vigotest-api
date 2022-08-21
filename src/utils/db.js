const mysql = require('mysql2');
const { dbConfig } = require('./constants');

const pool = mysql.createPool(dbConfig);

let createDatabase = "CREATE DATABASE IF NOT EXISTS `" + dbConfig.database + "`";

let createUserTable = `CREATE TABLE IF NOT EXISTS users 
(   id INT AUTO_INCREMENT PRIMARY KEY, 
    fullname VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    wallet INT NOT NULL DEFAULT ${0},
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

let createPostTable = `CREATE TABLE IF NOT EXISTS posts
(   id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    imgUrl VARCHAR(255) NOT NULL,
    description TEXT,
    allow_giftbag BOOLEAN NOT NULL DEFAULT ${true},
    allow_comment BOOLEAN NOT NULL DEFAULT ${true},
    hide_likes BOOLEAN NOT NULL DEFAULT ${false},
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

pool.query(createDatabase, (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected successfully');
        pool.query(createUserTable);
        pool.query(createPostTable);
    }
})


module.exports = pool.promise();