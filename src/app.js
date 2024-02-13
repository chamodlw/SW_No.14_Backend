//app.js
const express = require('express');
const app = express();
const cors = require('cors');
const controller = require('./controllers/controller1');

app.use(cors());

app.use(
    express.urlencoded({
        extended:true,
    })
);

app.use(express.json());

app.get('/tests',(req,res)=>{
    controller.getTests(tests => {
        res.send(tests);
    });
});

app.get('/test',(req,res) =>{
    const id =req.query.id;
    controller.getTestById(id,test =>{
        res.send(test);
    });
});

module.exports = app;