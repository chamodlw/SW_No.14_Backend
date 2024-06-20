// const { response } = require('./app');
const testresult = require('../models/model(RB_LA)');



const getresultbyid = (req, res, next) => {
    
    testresult.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            error: error
        });
};




exports.getUsers = getUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;


exports.getTestTubes = getTestTubes;
exports.addTestTube = addTestTube;
exports.updateTestTube = updateTestTube;
exports.deleteTestTube = deleteTestTube;
