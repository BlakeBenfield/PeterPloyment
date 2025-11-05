const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: 'peterployment',
    waitForConnections: true,
    connectionLimit: '10',
    idleTimeout: '20000',
    queueLimit: '10',
    enableKeepAlive: true
});

module.exports = pool;