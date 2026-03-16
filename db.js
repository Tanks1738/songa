const mysql = require("mysql2/promise");
const fs = require("fs"); // <-- you must import fs to use readFileSync
require("dotenv").config();

//const password = process.env.DB_PASSWORD;


const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port:DB_PORT,

  ssl: {
    // This enforces SSL and rejects invalid certificates
    rejectUnauthorized: true,
     ca: fs.readFileSync("ca.pem"), // path to the downloaded CA cert
  },
});

module.exports = pool;