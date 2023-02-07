const Employee = require('../models/employee_model');

const firstFiveWorkers = async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'No Input Date.' });

  let employees = await Employee.firstFiveWorkers(date);
  employees = employees.map((employee) => {
    return {
      employeeNumber: employee['employee_number'],
      date: employee['date'],
      clockIn: employee['clockin_time']
    };
  });
  res.status(200).json({ data: employees });
};

const noClockOutWorkers = async (req, res) => {
  const { dateFrom, dateTo } = req.query;
  if (!dateFrom || !dateTo) return res.status(400).json({ error: 'No Input Date Intervals.' });

  let employees = await Employee.noClockOutWorkers(dateFrom, dateTo);
  employees = employees.map((employee) => {
    return {
      employeeNumber: employee['employee_number'],
      date: employee['date'],
      clockOut: employee['clockout_time']
    };
  });

  res.status(200).json({ data: employees });
};

module.exports = { firstFiveWorkers, noClockOutWorkers };
