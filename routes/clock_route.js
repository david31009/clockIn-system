const router = require('express').Router();
const { wrapAsync } = require('../utils/util');
const { clock, clockMakeup } = require('../controllers/clock_controller');

router.route('/clock').post(wrapAsync(clock));
router.route('/clock/makeup').post(wrapAsync(clockMakeup));

module.exports = router;
