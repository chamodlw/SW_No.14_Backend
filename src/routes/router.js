const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/testing-users', controller.getUsers);
router.post('/create-testing-user', controller.addUser);
router.post('/update-testing-user', controller.updateUser);
router.delete('/delete-testing-user', controller.deleteUser);

// New routes for barcode scanning
router.post('/updateTestTubeId', controller.updateTestTubeId);
router.get('/getScannedTestTubeId', controller.getScannedTestTubeId);


router.get('/test_tubes', controller.getTestTubes);
router.post('/createtest_tubes', controller.addTestTube);
router.post('/updatetest_tubes', controller.updateTestTube);
router.delete('/deletetest_tubes', controller.deleteTestTube);

module.exports = router;