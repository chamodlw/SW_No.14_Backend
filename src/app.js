//app.js
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const controller1 = require('./controllers/controller1.js');
const controller_login = require('./controllers/controller_login.js');
const User = require('./models/model_login.js');
const { signin, login, getUser, updateUser, deleteUser } = require('./controllers/controller_login.js');


app.use(cors()); //middleware

app.use(
    express.urlencoded({
        extended:true,
    })
);

app.use(express.json()); //middleware

//chamod start
app.get('/tests',(req,res)=>{
    controller1.getTests(tests => {
        res.send(tests);
    });
});


app.post('/addtest',(req,res) =>{
    console.log('connect to mongodb');
    controller1.addTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/addappointment',(req,res) =>{
    console.log('connect to mongodb');
    controller1.addAppointment(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/updatetest',(req,res) =>{
    controller1.updateTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/deletetest',(req,res) =>{
    controller1.deleteTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/selecttest',(req,res) =>{
    controller1.selectTest(tests =>{
        res.send(tests);
    });
});
//chamod end

//Theoda signin start

app.get('/users',(req, res)=>{ 
    controller_login.getUser(req.body, res, (callack) => { 
        res.send(callack); 
    });
});

app.post('/createuser',(req, res) =>{
    controller_login.signin(req.body, (callack) =>{
        res.send(callack);
    });
});

    app.put('/updateuser',(req, res) =>{
        controller_login.updateUser(req.body, (callack) =>{
            res.send(callack); //returning call back to check whether the method has been updates correctly and who has been updated
        });
    });

        app.delete('/deleteuser',(req, res) =>{
            controller_login.deleteUser(req.body, (callack) =>{
                res.send(callack);
            });
        });

// Theoda login end
module.exports = app;