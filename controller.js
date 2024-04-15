const { response } = require('./app');
const User = require('./model');
const TestTube = require('./testTubeModel');


const getUsers = (req, res, next) => {
    User.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            error: error
        });
};

const addUser = (req, res, next) => {
    const user = new User({
        id: req.body.id,
        name: req.body.name,
        test: req.body.test,
        test_tubes: req.body.test_tubes, // Assuming req.body.test_tubes is an array
        blood_type: req.body.blood_type,
    });
    user.save()
    .then(response => {
        res.json({ response })
    })
    .catch(error => {
        res.status(400).json({ error: error.message }); // Sending a 400 Bad Request status with the error message
    });
};


const updateUser = (req, res, next) => {
    const { id, name, test, test_tubes, blood_type } = req.body;
    
    User.updateOne({ id: id }, { name: name, test: test, test_tubes: test_tubes, blood_type: blood_type })
    .then(response => {
        res.json({ response });
    })
    .catch(error => {
        error: error
    });
};


const deleteUser = (req, res, next) => {
    const id = req.body.id;
    User.deleteOne({ id: id })
    .then(response => {
        res.json({ response })
    })
    .catch(error => {
        error: error
    });
};

const getTestTubes = (req, res, next) => {
    TestTube.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            error: error
        });
};

const addTestTube = (req, res, next) => {
    const testtube = new TestTube({
        tube_id: req.body.tube_id,
        tube_type: req.body.tube_type,
        description: req.body.description,
        expire_date: req.body.expire_date,
        manufaturer: req.body.manufaturer,
        location: req.body.location,
    });
    testtube.save()
    .then(response => {
        res.json({ response })
    })
    .catch(error => {
        res.status(400).json({ error: error.message }); // Sending a 400 Bad Request status with the error message
    });
};

const updateTestTube = (req, res, next) => {
    const { tube_id, tube_type,description, expire_date, manufaturer, location } = req.body;
    
    TestTube.updateOne({ tube_id: tube_id }, { tube_type: tube_type, description: description, expire_date: expire_date, manufaturer : manufaturer, location: location })
    .then(response => {
        res.json({ response });
    })
    .catch(error => {
        error: error
    });
};

const deleteTestTube = (req, res, next) => {
    const tube_id = req.body.tube_id;
    TestTube.deleteOne({ tube_id: tube_id })
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
