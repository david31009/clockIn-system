const router = require('express').Router();
const { wrapAsync } = require('../utils/util');
const { firstFiveWorkers, noClockOutWorkers } = require('../controllers/employee_controller');

router.route('/employee/NoClockOut').get(wrapAsync(noClockOutWorkers));
router.route('/employee/FirstFive').get(wrapAsync(firstFiveWorkers));

module.exports = router;
