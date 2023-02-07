const { pool } = require('./mysqlcon');

const clock = async (employeeNumber, date, time) => {
  // 檢查有無打過卡
  const [check] = await pool.execute(
    'SELECT * FROM `attendance_records` WHERE `employee_number` = ? AND `date` = ?',
    [employeeNumber, date]
  );

  if (check.length === 0) {
    // 打上班卡
    await pool.execute(
      'INSERT INTO `attendance_records` (employee_number, date, clockin_time) VALUES (?, ?, ?)',
      [employeeNumber, date, time]
    );
    return { message: 'ClockIn Sucessfully.' };
  } else if (check[0]['clockin_time'] && check[0]['clockout_time']) {
    // 重複打卡
    return { error: 'Already Clocked.' };
  } else {
    // 打下班卡
    await pool.execute(
      'UPDATE `attendance_records` SET `clockout_time` = ? WHERE `employee_number` = ? AND `date` = ?',
      [time, employeeNumber, date]
    );
    return { message: 'ClockOut Sucessfully.' };
  }
};

const clockMakeup = async (employeeNumber, date, time) => {
  // 檢查有無打過卡
  const [check] = await pool.execute(
    'SELECT * FROM `attendance_records` WHERE `employee_number` = ? AND `date` = ?',
    [employeeNumber, date]
  );

  if (check.length === 0) {
    // 補打卡
    await pool.execute(
      'INSERT INTO `attendance_records` (employee_number, date, clockout_time) VALUES (?, ?, ?)',
      [employeeNumber, date, time]
    );
    return { message: 'Clock Makeup Sucessfully.' };
  } else {
    // 重複補打卡
    return { error: 'Already Clocked Makeup.' };
  }
};

module.exports = { clock, clockMakeup };
