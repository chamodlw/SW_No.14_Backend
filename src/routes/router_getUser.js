// const express = require('express');
// const getUser = express.Router();
// // const getUserByID = require('../controllers/controller_getUserByID');
// const User = require('../models/model_login');


// getUser.get('/getuser/:firstname', (req, res) => {
//     try {
//         const firstname = req.params.firstname;  //get Id by parameter 
//         console.log(`Fetching User with ID: ${firstname}`);
//         const user =  User.findOne({ firstname:firstname });

//         if (User) {
//             res.json({  user });
//         // } else {
//             res.status(404).json({ error: "user not found" });
//         }
//     } catch (error) {
      
//         res.status(500).json({ error });
//     }
// });
// module.exports = getUser;


const express = require('express');
const getUser = express.Router();
// const getUserByID = require('../controllers/controller_getUserByID');
const User = require('../models/model_login');
const { getUserByID } = require('../controllers/controller_getUserByID');

getUser.get('/getuser/:id',getUserByID);
    

module.exports = getUser;
