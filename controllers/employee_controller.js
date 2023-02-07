const Employee = require('../models/employee_model');

const firstFiveWorkers = async (req, res) => {
  const { date } = req.query;
  let employees = await Employee.firstFiveWorkers(date);
  employees = employees.map((employee) => {
    return {
      employeeNumber: employee['employee_number'],
      date: employee['date'],
      clockIn: employee['clockin_time']
    };
  });
  res.status(200).json({ [date]: employees });
};

const noClockOutWorkers = async (req, res) => {
  const { date } = req.query;
  const dateStart = date.split('~')[0];
  const dateEnd = date.split('~')[1];

  if (!dateStart || !dateEnd) {
    return res.json({ error: 'Wrong Input Format.' });
  }

  let employees = await Employee.noClockOutWorkers(dateStart, dateEnd);
  employees = employees.map((employee) => {
    return {
      employeeNumber: employee['employee_number'],
      date: employee['date'],
      clockOut: employee['clockout_time']
    };
  });

  res.status(200).json({ [date]: employees });
};

module.exports = { firstFiveWorkers, noClockOutWorkers };
