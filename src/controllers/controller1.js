const { response } = require('../app');
const Test = require('././models/model1.js');

const getTests = (req,res,next) =>{
    Test.find()
        .then(response =>{
            res.json({response})
        })
        .catch(error =>{
            res.json({error})
        })
};

const addTest =(req,res,next) =>{
    const test =new Test({
        id: req.body.id,
        name: req.body.name,
        descripton: req.body.descripton,
    });
    user.save()
        .then(response=> {
            res.json({response})
        })
        .catch(error=> {
            res.json({error})
        });
}

const updateTest =(req,res,next) =>{
    const {id,name,descripton} = req.body;
    
    Test.updateOne({id:id} , {$set: {name: name}})
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

exports.updateTests = updateTests;
exports.addTests = addTests;
exports.deleteTests = deleteTests;
exports.getTests = getTests;