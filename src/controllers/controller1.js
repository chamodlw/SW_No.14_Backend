//controller1.js
const Test = require('../models/model1');

const getTests = (req,res,next) =>{
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
exports.deleteTest = deleteTest;
exports.selectTest = selectTest;
