require('dotenv').config({ path: '../.env' });
const { pool } = require('../models/mysqlcon');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('member.json', { encoding: 'utf-8' }));

function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

// 資料整理，統一 key 名稱
const cleanData = data.map((record) => {
  const renameObj = renameKeys(record, { 'clockIn ': 'clockIn' });
  return renameObj;
});

const insertData = async () => {
  const records = cleanData.map((record) => {
    const employee_number = record['employeeNumber'];
    const date = record['clockIn']
      ? record['clockIn'].split(' ')[0]
      : record['clockOut'].split(' ')[0];
    const clockin_time = record['clockIn'] ? record['clockIn'].split(' ')[1] : null;
    const clockout_time = record['clockOut'] ? record['clockOut'].split(' ')[1] : null;

    const cleanRecord = {
      employee_number,
      date,
      clockin_time,
      clockout_time
    };

    return cleanRecord;
  });

  // 插入多列，只有 query 適用
  try {
    await pool.query(
      'INSERT INTO `attendance_records` (employee_number, date, clockin_time, clockout_time) VALUES ?',
      [records.map((x) => Object.values(x))]
    );
    console.log('insert data successfully.');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

insertData();
