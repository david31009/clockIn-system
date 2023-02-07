const moment = require('moment');
function workTime(clockIn, clockOut) {
  if (!clockIn || !clockOut) return null;
  clockIn = moment(clockIn, 'hh:mm:ss');
  clockOut = moment(clockOut, 'hh:mm:ss');
  let duration = clockOut.diff(clockIn, 'minute') / 60;
  duration = Math.round(duration * 10) / 10;
  return duration;
}

function breakTime(clockIn, clockOut) {
  if (!clockIn || !clockOut) return null;
  clockIn = moment(clockIn, 'hh:mm:ss');
  clockOut = moment(clockOut, 'hh:mm:ss');
  let breakStart = moment('12:00:00', 'hh:mm:ss');
  let breakEnd = moment('13:30:00', 'hh:mm:ss');
  let breakTime = clockIn <= breakStart && clockOut >= breakEnd ? 1.5 : null;
  return breakTime;
}

function organize(workersInfo) {
  workersInfo = workersInfo.map((info) => {
    let clockIn = info['clockin_time'];
    let clockOut = info['clockout_time'];
    return {
      employeeNumber: info['employee_number'],
      clockIn: clockIn,
      clockOut: clockOut,
      breakTime: breakTime(clockIn, clockOut),
      workTime: workTime(clockIn, clockOut)
    };
  });
  return workersInfo;
}

module.exports = { workTime, breakTime, organize };
