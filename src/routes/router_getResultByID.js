const express = require('express');
const router = express.Router();
const controller_getUserByID = require('../controllers/controller_getResultByID');

router.get('/testresult/:id/name/:testName', controller_getUserByID.getResultByID);

module.exports = router;
