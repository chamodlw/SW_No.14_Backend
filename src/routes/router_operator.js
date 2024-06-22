const express = require('express');
const router = express.Router();
const controller_operator = require('../controllers/controller_operator');

router.post('/testresult', controller_operator.testresult);

module.exports = router;
