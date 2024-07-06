

const express = require('express');
const getUser = express.Router();
// const getUserByID = require('../controllers/controller_getUserByID');
const User = require('../models/model_login');
const { getUserByID } = require('../controllers/controller_getUserByID');

getUser.get('/getuser/:id', getUserByID);
    

module.exports = getUser;
