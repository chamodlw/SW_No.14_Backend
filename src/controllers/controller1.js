//controller1.js
const Test = require('../models/model1');
const Appointment = require('../models/model2');

const getTests = (req,res) =>{
    Test.find()
        .then(response =>{
            res.json({response})
        })
        .catch(error =>{
            res.json({error})
        })
};

const addTest = (req, res, next) => {
    const { id, name, description } = req.body;
    const test = new Test({
        id:id,
      name: name,
      description: description,
    });
    test.save()
      .then(response => {
        res.json({ response });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  
  const addAppointment = (req, res, next) => {
    const { id, selectTestIds, selectTestNames } = req.body;
    
    // Create an array to hold the tests with their IDs and names
    const selectTests = [];
    
    // Loop through the IDs and names arrays to create objects for each test
    for (let i = 0; i < selectTestIds.length; i++) {
        selectTests.push({
            testId: selectTestIds[i],
            testName: selectTestNames[i]
        });
    }

    // Create a new appointment object with the selectTests array
    const appointment = new Appointment({
        id: id,
        selectTests: selectTests // Include selectTests array in the appointment object
    });

    // Save the appointment to the database
    appointment.save()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};
const updateTest =(req,res,next) =>{
    const {id,name,description} = req.body;
    // Prepare the update object based on user input
    let updateObject = {};
    if (name) {
        updateObject.name = name;
    }
    if (description) {
        updateObject.description = description;
    }

    // Update the Test document
    Test.updateOne({ id: id }, { $set: updateObject })
        .then(response=> {
            res.json({response})
        })
        .catch(error=> {
            res.json({error})
        });
}

const deleteTest =(req,res,next) =>{
    const id = req.body.id;
    
    Test.deleteOne({id: id})
        .then(response=> {
            res.json({response})
        })
        .catch(error=> {
            res.json({error})
        });
}

const selectTest =(req,res,next) =>{
    const id = req.body.id;
    
    Test.find({id: id})
        .then(response=> {
            res.json({response})
        })
        .catch(error=> {
            res.json({error})
        });
}

exports.getTests = getTests;
exports.updateTest = updateTest;
exports.addTest = addTest;
exports.addAppointment = addAppointment;
exports.deleteTest = deleteTest;
exports.selectTest = selectTest;
