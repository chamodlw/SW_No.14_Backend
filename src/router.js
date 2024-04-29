const express = require('express');
const router =express.Router();
const controller = require('./controller');

router.get('/users',controller.getUsers);
router.post('/updateUser',controller.UpdateUser);
// router.get('/user',controller.getUserById);

module.exports = router;