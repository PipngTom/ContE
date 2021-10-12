import mysql from 'mysql';

const db = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "divljidetektiv",
    database: "users",
    port: "3306",
    connectionLimit: 10
  })

export default db;