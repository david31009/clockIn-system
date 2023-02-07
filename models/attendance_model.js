const { pool } = require('./mysqlcon');

const attendanceDate = async (date) => {
  const sql = 'SELECT * FROM `attendance_records` WHERE `date` = ?';
  const [workersInfo] = await pool.execute(sql, [date]);
  return workersInfo;
};

const attendanceToday = async (date) => {
  const sql = 'SELECT * FROM `attendance_records` WHERE `date` = ?';
  const [workersInfo] = await pool.execute(sql, [date]);
  return workersInfo;
};

module.exports = { attendanceDate, attendanceToday };
