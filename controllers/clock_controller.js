const moment = require('moment');
const Clock = require('../models/clock_model');

const clock = async (req, res) => {
  const { employeeNumber } = req.body;
  if (employeeNumber.length != 7) {
    return res.status(400).json({ error: 'Wrong Employee Nummber.' });
  }
  const date = moment().format('YYYY-MM-DD');
  const time = moment().format('hh:mm:ss');
  const message = await Clock.clock(employeeNumber, date, time);
  res.status(200).json(message);
};

const clockMakeup = async (req, res) => {
  const { employeeNumber } = req.body;
  if (employeeNumber.length != 7) {
    return res.status(400).json({ error: 'Wrong Employee Nummber.' });
  }
  const date = moment().format('YYYY-MM-DD');
  const time = moment().format('hh:mm:ss');
  const message = await Clock.clockMakeup(employeeNumber, date, time);
  res.status(200).json(message);
};

module.exports = { clock, clockMakeup };
