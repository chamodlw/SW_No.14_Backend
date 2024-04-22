//app.js
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const controller = require('./controller');
const controllertmng = require('./controllers/controller-tmng.js');
const controllerappmng = require('./controllers/controller-appmng.js');
const controller3 = require('./controllers/controller3.js');
const User = require('./models/model3.js');
const { signin, login, getUser, updateUser, deleteUser } = require('./controllers/controller3.js');

app.use(cors());

app.use(
    express.urlencoded({
        extended:true,
    })
);

app.use(express.json());

//chamod start
app.get('/tests',(req,res)=>{
    controllertmng.getTests(tests => {
        res.send(tests);
    });
});


app.post('/addtest',(req,res) =>{
    console.log('connect to mongodb');
    controllerappmng.addTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/addappointment',(req,res) =>{
    console.log('connect to mongodb');
    controllertmng.addAppointment(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/updatetest',(req,res) =>{
    controllertmng.updateTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/deletetest',(req,res) =>{
    controllertmng.deleteTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/selecttest',(req,res) =>{
    controllertmng.selectTest(tests =>{
        res.send(tests);
    });
});
//chamod end

//Theoda signin start

//making rest APIs and taking the CRUD we built in controller, to app.js
app.get('/users',(req, res)=>{ //The URL /users represents a route in this Express application. When a client makes a GET request to this URL, the corresponding route handler is triggered. 
    controller3.getUser(req.body, res, (callack) => { //controller3 - using a controller named controller3 and invoking its getUsers method. Here, req, res, next are parameters.
        res.send(callack); //User - what is being exported in model3
        console.log('connect ');
    });
});

app.post('/createuser',(req, res) =>{
    controller3.signin(req.body, (callack) =>{
        res.send(callack);
    });
});

    app.put('/updateuser',(req, res) =>{
        controller3.updateUser(req.body, (callack) =>{
            res.send(callack); //returning call back to check whether the method has been updates correctly and who has been updates
        });
    });

        app.delete('/deleteuser',(req, res) =>{
            controller3.deleteUser(req.body, (callack) =>{
                res.send(callack);
            });
        });

// Theoda login end

//rajith
app.get('/testing-users', (req, res) =>  {
    controller.getUsers((req, res, next) => {
        res.send();
    });
});

app.post('/create-testing-user', (req, res) =>  {
    controller.addUser(req.body, (callback) => {
        res.send();
    });
});

app.post('/update-testing-user', (req, res) =>  {
    controller.updateUser(req.body, (callback) => {
        res.send(callback);
    });
});

app.delete('/delete-testing-user', (req, res) =>  {
    controller.deleteUser(req.body, (callback) => {
        res.send(callback);
    });
});



app.get('/test_tubes', (req, res) =>  {
    controller.getTestTubes((req, res, next) => {
        res.send();
    });
});

app.post('/createtest_tubes', (req, res) =>  {
    controller.addTestTube(req.body, (callback) => {
        res.send();
    });
});

app.post('/updatetest_tubes', (req, res) =>  {
    controller.updateTestTube(req.body, (callback) => {
        res.send(callback);
    });
});

app.delete('/deletetest_tubes', (req, res) =>  {
    controller.deleteTestTube(req.body, (callback) => {
        res.send(callback);
    });
});


module.exports = app;