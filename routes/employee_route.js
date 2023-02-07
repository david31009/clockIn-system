const router = require('express').Router();
const { wrapAsync } = require('../utils/util');
const { firstFiveWorkers, noClockOutWorkers } = require('../controllers/employee_controller');

router.route('/employee/noClockOut').get(wrapAsync(noClockOutWorkers));
router.route('/employee/firstFive').get(wrapAsync(firstFiveWorkers));

module.exports = router;
