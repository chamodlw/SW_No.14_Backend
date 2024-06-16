//controller-.js
const Test = require('../models/model-tmng');

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
    const { id, name, description ,max,min,unit,price} = req.body;
    const test = new Test({
        id:id,
        name: name,
        description: description,
        min:min,
        max:max,
        unit:unit,
        price:price,
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
    const {id,name,description,max,min,unit,price} = req.body;
    // Prepare the update object based on user input
    let updateObject = {};
    if (name) {
        updateObject.name = name;
    }
    if (description) {
        updateObject.description = description;
    }
    if (min) {
        updateObject.min = min;
    }
    if (max) {
        updateObject.max = max;
    }
    if (unit) {
        updateObject.unit = unit;
    }
    if (price) {
        updateObject.price = price;
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
