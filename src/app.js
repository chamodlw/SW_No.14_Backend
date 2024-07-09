//app.js
const express = require('express'); //Importing the express framework by requiring the 'express'module.
const app = express();  //Creates an instance of the Express application.
const cors = require('cors');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const User = require('../src/models/model_login.js');

const controller = require('./controllers/controller.js');
const controllertmng = require('./controllers/controller-tmng.js');
const controllerappmng = require('./controllers/controller-appmng.js');
const controller_dapproval = require('./controllers/controller_dapproval.js');
const controller_login = require('./controllers/controller_login.js');
const controllertsr=require('./controllers/controller_operator.js');
const controller_email=require('./controllers/controller_email.js');

//middleware
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL, //Where we would like to access the jwt token from? The frontend URL of Login
    credentials: true,
  }
));
// app.options('*', cors());

// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(
    express.urlencoded({
        extended:true,
    })
);


// Import routes
const routerappmng = require('./routes/router-appmng');
const routertmng = require('./routes/router-tmng');
const router = require('./routes/router');
const router_dapproval = require('./routes/routes_dapproval');
const router_login = require('./routes/router_login');
const protectedRoutes = require('./routes/protected');
const router_operator = require('./routes/router_operator.js');
const router_email = require('./routes/router_email.js');
const recordRoutes = require('./routes/RB.js');

// Routes - How will the routers in route files will be accessed.
app.use('/api', router);
app.use('/api', router_dapproval);
app.use('/api', routerappmng);
app.use('/api', routertmng);
app.use('/api/router_login', router_login);
app.use('/api/protected', protectedRoutes);
app.use('/api', router_operator);
app.use('/api', router_email);


//Define routes - Router handles
//chamod start


//  fix code RB
app.get('/tests',(req, res)=>{  
    controllertmng.getTests(req.body, res , (callback) => {
        res.send(callback);
    });
});
// app.get('/tests',(req, res)=>{  
//     controllertmng.getTests(tests => {
//         res.send(tests);
//     });
// });


app.post('/addtest',(req, res) =>{
    console.log('connect to mongodb');
    controllerappmng.addTest(req.body,(callack) =>{
        res.send(callack);
    });
});


app.post('/updatetest',(req, res) =>{
    controllertmng.updateTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/deletetest',(req, res) =>{
    controllertmng.deleteTest(req.body,(callack) =>{
        res.send(callack);
    });
});

app.post('/selecttest',(req, res) =>{
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
    controller_login.addUser(req.body, (callack) =>{
    });
});

app.post('/updateuser',(req, res) =>{
        controller_login.updateUser(req.body, (callack) =>{
            res.send(callack);
        });
    });

app.post('/deleteuser',(req, res) =>{
        controller_login.deleteUser(req.body, (callack) =>{
            res.send(callack);
        });
    });

app.post('/login', (req, res) => {
        try {
            controller_login.login(req.body, (callback) => {
                if (callback.error) {
                    console.error('Login error:', callback.error);
                    res.status(500).json({ message: callback.error });
                } else {
                    res.status(200).json(callback);
                }
            });
    } catch (error) {
            console.error('Unexpected server error:', error);
            res.status(500).json({ message: 'Internal server error.' });
    }
});
    

    // Chamod code 2 start
app.get('/appointments',(req,res)=>{
    controllerappmng.getAppointments(appointments => {
        res.send(appointments);
    });
});
app.get('/appointmentIds',(req,res)=>{
    controllerappmng.getAppointmentIds(appointmentIds => {
        res.send(appointmentIds);
    });
});

app.post('/addappointment',(req,res) =>{
    console.log('connect to mongodb');
    controllerappmng.addAppointment(req.body,(callack) =>{
        res.send(callack);
    });
});
app.post('/updateappointment',(req, res) =>{
    controllerappmng.updateAppointment(req.body,(callack) =>{
        res.send(callack);
    });
});

//chamod end

//kavini start
app.post('/recommendations',(req,res) =>{
    console.log('connect to mongodb');
    controller_dapproval.recommendation(req.body,(callack) =>{
        res.send(callack);
    });
});
app.post('/testresult',(req,res) =>{
    console.log('connect to mongodb');
    controllertsr.testresult(req.body,(callack) =>{
        res.send(callack);
    });
});
app.get('/api/patientId/:reportId',(req, res)=>{ 
    controller_dapproval. getPatientIdByReportId(req.body, res, (callack) => { 
        res.send(callack); 
    });
});
app.post('/approve',(req,res) =>{
    console.log('connect to mongodb');
    controller_email.approveReport(req.body,(callack) =>{
        res.send(callack);
    });
});
app.get('/getResults', (req, res) =>  {
    controllertsr.getResults((req, res, next) => {
        res.send();
    });
});
app.post('/updateResults', (req, res) =>  {
    controllertsr.updateResults(req.body, (callback) => {
        res.send(callback);
    });
});

app.delete('/deleteResults',(req, res) =>{
    controllertsr.deleteResults(req.body, (callack) =>{
        res.send(callack);
            });
        });

//rajith start
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


// router for get test report

app.use('/labreport', recordRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;