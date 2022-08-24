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
    allow_comments BOOLEAN NOT NULL DEFAULT ${true},
    hide_likes BOOLEAN NOT NULL DEFAULT ${false},
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

let createCommentTable = `CREATE TABLE IF NOT EXISTS comments
(   id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

let createLikeTable = `CREATE TABLE IF NOT EXISTS likes
(   id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

let createGiftsTable = `
    CREATE TABLE IF NOT EXISTS gifts
    (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        amount INT NOT NULL,
        imgUrl VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

let createUserGiftsTable = `
    CREATE TABLE IF NOT EXISTS usergifts
    (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender_id INT NOT NULL,
        gift_id INT NOT NULL,
        receiver_id INT NOT NULL,
        quantity INT NOT NULL,
        currency VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

let createTransactionsTable = `
    CREATE TABLE IF NOT EXISTS transactions
    (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender_id INT NOT NULL,
        receiver_id INT NOT NULL,
        gift_id INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        amount INT NOT NULL,
        quantity INT NOT NULL,
        currency VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

pool.query(createDatabase, (err, results) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected successfully');
        pool.query(createUserTable);
        pool.query(createPostTable);
        pool.query(createCommentTable);
        pool.query(createLikeTable);
        pool.query(createGiftsTable);
        pool.query(createUserGiftsTable);
        pool.query(createTransactionsTable);

    }
})


module.exports = pool.promise();