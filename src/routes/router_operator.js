const express = require('express');
const router = express.Router();
const controller_operator = require('../controllers/controller_operator');

router.post('/testresult', controller_operator.testresult);
router.get('/getResults', controller_operator.getResults);
router.post('/updateResults', controller_operator.updateResults);
router.delete('/deleteResults', controller_operator.deleteResults);


module.exports = router;
