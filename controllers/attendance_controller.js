const moment = require('moment');
const Attendance = require('../models/attendance_model');
const { organize } = require('../service/attendance_service');

const attendanceDate = async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'No Input Date.' });

  let workersInfo = await Attendance.attendanceDate(date);
  workersInfo = organize(workersInfo);
  res.status(200).json({ data: workersInfo });
};

const attendanceToday = async (req, res) => {
  const date = moment().format('YYYY-MM-DD');
  let workersInfo = await Attendance.attendanceToday(date);
  workersInfo = organize(workersInfo);
  res.status(200).json({ data: workersInfo });
};

module.exports = { attendanceDate, attendanceToday };
