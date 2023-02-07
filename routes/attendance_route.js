const router = require('express').Router();
const { wrapAsync } = require('../utils/util');
const { attendanceDate, attendanceToday } = require('../controllers/attendance_controller');

router.route('/attendance').get(wrapAsync(attendanceDate));
router.route('/attendance/today').get(wrapAsync(attendanceToday));

module.exports = router;
