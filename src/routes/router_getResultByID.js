const express = require('express');
const router = express.Router();
const controller_getUserByID = require('../controllers/controller_getResultByID');

router.get('/testresult/:id', controller_getUserByID.getResultByID);
router.get('/testresult', controller_getUserByID.getResult);

module.exports = router;
