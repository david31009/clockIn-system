require('dotenv').config({ path: '../.env' });
const { pool } = require('../models/mysqlcon');

// create table
const createTable = async () => {
  try {
    await pool.execute('DROP TABLE IF EXISTS `attendance_records`;');
    console.log('Drop existed table');

    await pool.execute(
      'CREATE TABLE `attendance_records`(`employee_number` CHAR(7), `date` DATE, `clockin_time` TIME, `clockout_time` TIME, PRIMARY KEY (`employee_number`, `date`))'
    );
    console.log('table created successfully.');
    process.exit();
  } catch (error) {
    console.log('create table failed');
    console.log(error);
    process.exit();
  }
};

createTable();
