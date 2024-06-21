// const { response } = require('./app');
const User = require('../models/model');
const TestTube = require('../models/testTubeModel');
const jsbarcode = require('jsbarcode');
const { createCanvas } = require('canvas');
const { v4: uuidv4 } = require('uuid');


// Temporary storage for scanned Test Tube ID (for simplicity, consider using a more persistent solution)
let scannedTestTubeId = '';

const getUsers = (req, res, next) => {
    User.find()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

const addUser = (req, res, next) => {
    const user = new User({
        id: req.body.id,
        name: req.body.name,
        test: req.body.test,
        test_tubes: req.body.test_tubes, 
        test_tube_id: req.body.test_tube_id,
        blood_type: req.body.blood_type,
    });
    user.save()
    .then(response => {
        res.json({ response });
    })
    .catch(error => {
        res.status(400).json({ error: error.message });
    });
};

const updateUser = (req, res, next) => {
    const { id, name, test, test_tubes, test_tube_id, blood_type } = req.body;
    
    User.updateOne({ id: id }, { name: name, test: test, test_tubes: test_tubes, test_tube_id: test_tube_id, blood_type: blood_type })
    .then(response => {
        res.json({ response });
    })
    .catch(error => {
        res.status(400).json({ error: error.message });
    });
};

const deleteUser = (req, res, next) => {
    const id = req.body.id;
    User.deleteOne({ id: id })
    .then(response => {
        res.json({ response });
    })
    .catch(error => {
        res.status(400).json({ error: error.message });
    });
};

const updateTestTubeId = (req, res, next) => {
    const { testTubeId } = req.body;
    scannedTestTubeId = testTubeId; // Store the scanned ID
    res.send({ message: 'Test Tube ID updated successfully' });
};

const getScannedTestTubeId = (req, res, next) => {
    res.send({ testTubeId: scannedTestTubeId });
};


const getTestTubes = (req, res, next) => {
    TestTube.find()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

const addTestTube = (req, res, next) => {
    // Generate a unique ID using uuid
    const id = uuidv4();

    // Generate a barcode using the unique ID
    const canvas = createCanvas();
    jsbarcode(canvas, id, { format: 'CODE128' });
    const barcodeDataUrl = canvas.toDataURL(); // Convert the canvas to a Base64-encoded image

    const testtube = new TestTube({
        _id: id, // Use the generated barcode ID as the _id
        tube_type: req.body.tube_type,
        description: req.body.description,
        expire_date: req.body.expire_date,
        manufacturer: req.body.manufacturer,
        location: req.body.location,
    });
    
    testtube.save()
    .then(response => {
        res.json({ response, barcode: barcodeDataUrl }); // Include the barcode in the response
    })
    .catch(error => {
        res.status(400).json({ error: error.message });
    });
};

const updateTestTube = (req, res, next) => {
    const { _id, tube_type, description, expire_date, manufacturer, location } = req.body;
    
    TestTube.findByIdAndUpdate(_id, {
        tube_type,
        description,
        expire_date,
        manufacturer,
        location,
    }, { new: true })
    .then(response => {
        if (!response) {
            return res.status(404).json({ error: 'Test tube not found' });
        }
        res.json({ response });
    })
    .catch(error => {
        res.status(400).json({ error: error.message });
    });
};

const deleteTestTube = (req, res, next) => {
    const { _id } = req.body;
    TestTube.findByIdAndDelete(_id)
    .then(response => {
        if (!response) {
            return res.status(404).json({ error: 'Test tube not found' });
        }
        res.json({ response });
    })
    .catch(error => {
        res.status(400).json({ error: error.message });
    });
};




exports.getUsers = getUsers;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.updateTestTubeId = updateTestTubeId;
exports.getScannedTestTubeId = getScannedTestTubeId;


exports.getTestTubes = getTestTubes;
exports.addTestTube = addTestTube;
exports.updateTestTube = updateTestTube;
exports.deleteTestTube = deleteTestTube;
