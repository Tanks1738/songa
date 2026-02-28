const mysql = require("mysql2/promise");
const fs = require("fs"); // <-- you must import fs to use readFileSync
require("dotenv").config();

const variable = process.env.DB_PASSWORD;


const pool = mysql.createPool({
  host: "mysql.railway.internal",
  user: "root",
  password: variable,
  database: "fleet_management",
  port: 3306,
  ssl: {
    // This enforces SSL and rejects invalid certificates
    rejectUnauthorized: true,
     ca: fs.readFileSync("ca.pem"), // path to the downloaded CA cert
  },
});

module.exports = pool;
