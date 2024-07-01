// routes/emailRoutes.js
const express = require('express');
const { approveReport } = require('../controllers/controller_email');
const { recheckReport } = require('../controllers/controller_recheck');
const router = express.Router();

router.post('/approve', approveReport);
router.post('/recheck', recheckReport);
module.exports = router;
