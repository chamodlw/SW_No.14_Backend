//app.jsf
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const controller = require('./controller');
const controllertmng = require('./controllers/controller-tmng.js');
const controllerappmng = require('./controllers/controller-appmng.js');
const controller3 = require('./controllers/controller_dapproval.js');
const controller_login = require('./controllers/controller_login.js');
const User = require('./models/model_login.js');
const { signin, login, getUser, updateUser, deleteUser } = require('./controllers/controller_login.js');

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

//Theoda signin start

app.get('/users',(req, res)=>{ 
    controller_login.getUser(req.body, res, (callack) => { 
        res.send(callack); 
    });
});

app.post('/createuser',(req, res) =>{
    controller_login.signin(req.body, (callack) =>{
    });
});

app.put('/updateuser',(req, res) =>{
        controller_login.updateUser(req.body, (callack) =>{
            res.send(callack); //returning call back to check whether the method has been updates correctly and who has been updated
        });
    });

app.get('/appointments',(req,res)=>{
    controllerappmng.getAppointments(appointments => {
        res.send(appointments);
    });
});
app.post('/addappointment',(req,res) =>{
    console.log('connect to mongodb');
    controllerappmng.addAppointment(req.body,(callack) =>{
        res.send(callack);
    });
});

//chamod end
app.post('/recommendations',(req,res) =>{
    console.log('connect to mongodb');
    controller3.recommendation(req.body,(callack) =>{
        res.send(callack);
    });
});
//rajith
app.get('/testing-users', (req, res) =>  {
    controller.getUsers((req, res, next) => {
        res.send();
    });
});

app.delete('/deleteuser',(req, res) =>{
    controller_login.deleteUser(req.body, (callack) =>{
        res.send(callack);
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