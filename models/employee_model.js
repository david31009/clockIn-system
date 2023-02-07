const { pool } = require('./mysqlcon');

const firstFiveWorkers = async (date) => {
  const sql =
    'SELECT `employee_number`, `date`, `clockin_time` FROM `attendance_records` WHERE `date` = ? ORDER BY `clockin_time` IS NULL, `clockin_time` ASC limit 5';
  const [employees] = await pool.execute(sql, [date]);
  return employees;
};

const noClockOutWorkers = async (dateStart, dateEnd) => {
  const sql =
    'SELECT `employee_number`, `date`, `clockout_time` FROM `attendance_records` WHERE `date` BETWEEN ? AND ? AND `clockout_time` IS NULL ORDER BY `date`';
  const [employees] = await pool.execute(sql, [dateStart, dateEnd]);
  return employees;
};

module.exports = { firstFiveWorkers, noClockOutWorkers };
