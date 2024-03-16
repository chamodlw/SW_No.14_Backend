//app.js
const express = require('express');
const app = express();
const cors = require('cors');
const controller = require('./controllers/controller1.js');

app.use(cors());

app.use(
    express.urlencoded({
        extended:true,
    })
);

app.use(express.json());

//chamod start
app.get('/tests',(req,res)=>{
    controller.getTests(tests => {
        res.send(tests);
    });
});


app.post('/addtest',(req,res) =>{
    console.log('connect to mongodb');
    controller.addTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/addappointment',(req,res) =>{
    console.log('connect to mongodb');
    controller.addAppointment(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/updatetest',(req,res) =>{
    controller.updateTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/deletetest',(req,res) =>{
    controller.deleteTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/selecttest',(req,res) =>{
    controller.selectTest(tests =>{
        res.send(tests);
    });
});
//chamod end

module.exports = app;