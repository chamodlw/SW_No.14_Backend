//app.js
const jwt = require('jsonwebtoken');
const express = require('express'); //Importing the express framework by requiring the 'express'module.
const app = express();  //Creates an instance of the Express application.
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const User = require('../src/models/model_login.js');


const controller = require('./controllers/controller.js');
const controllertmng = require('./controllers/controller-tmng.js');
const controllerappmng = require('./controllers/controller-appmng.js');
const controller3 = require('./controllers/controller_dapproval.js');
const controller_login = require('./controllers/controller_login.js');


//middleware
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL, //Where we would like to access the jwt token from? The frontend URL of Login
    credentials: true,
  }
));
app.use(bodyParser.json());

app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
    express.urlencoded({
        extended:true,
    })
);
app.use(express.json());

// Multer middleware configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define dynamic destination directory based on user preferences
    const uploadPath = `uploads/${req.user.username}/`; // Example: uploads/username/
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Define dynamic filename based on user preferences and current timestamp
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${uniqueSuffix}${ext}`;
    cb(null, fileName);
  },
});

// Initialize Multer with configured options
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    // Accept image files only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('File is not an image!'), false);
    }
    cb(null, true);
  },
}).single('profilePic'); // Ensure this matches the field name in the FormData object

  
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Import routes
const routerappmng = require('./routes/router-appmng');
const routertmng = require('./routes/router-tmng');
const router = require('./routes/router');
const router_dapproval = require('./routes/routes_dapproval');
const router_login = require('./routes/router_login');
const protectedRoutes = require('./routes/protected');

// Routes - How will the routers in route files will be accessed.
app.use('/api', router);
app.use('/api', router_dapproval);
app.use('/api', routerappmng);
app.use('/api', routertmng);
app.use('/api/router_login', router_login);
app.use('/api/protected', protectedRoutes);

//Define routes - Router handles
//chamod start
app.get('/tests',(req, res)=>{  
    controllertmng.getTests(tests => {
        res.send(tests);
    });
});


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
    console.log('GET /users', req.body);
    controller_login.getUser(req.body, res, (callack) => { 
        res.send(callack); 
    });
});

app.post('/createuser',(req, res) =>{
    console.log('POST /createuser', req.body);
    controller_login.addUser(req.body, (callack) =>{
        console.log('Create user callback:', callack);
        res.send(callack);
    });
});

app.post('/updateuser', upload, (req, res) =>{
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


module.exports = app;