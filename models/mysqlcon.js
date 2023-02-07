require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2/promise');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const options = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE
};

options.dateStrings = true; // 存時間進去會以 string 儲存，而非 object
options.waitForConnections = true; // 無可用連線時是否等待pool連線釋放 (預設為 true)
options.connectionLimit = 10; // 連線池可建立的總連線數上限 (預設最多為 10 個連線數)

const pool = mysql.createPool(options);

module.exports = { pool, mysql };
