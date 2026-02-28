const mysql = require("mysql2/promise");
const fs = require("fs"); // <-- you must import fs to use readFileSync
require("dotenv").config();

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "Loaded" : "Missing");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,

  ssl: {
    // This enforces SSL and rejects invalid certificates
    rejectUnauthorized: true,
     ca: process.env.DB_CA_CERT,
   //  ca: fs.readFileSync("ca.pem"), // path to the downloaded CA cert
  },
  
});

module.exports = pool;