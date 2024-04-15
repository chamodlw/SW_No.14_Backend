const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/users', controller.getUsers);
router.post('/createuser', controller.addUser);
router.post('/updateuser', controller.updateUser);
router.delete('/deleteuser', controller.deleteUser);

router.get('/test_tubes', controller.getTestTubes);
router.post('/createtest_tubes', controller.addTestTube);
router.post('/updatetest_tubes', controller.updateTestTube);
router.delete('/deletetest_tubes', controller.deleteTestTube);

module.exports = router;