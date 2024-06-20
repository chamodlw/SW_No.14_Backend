//require('dotenv').config(); //To manage env variables
const port = process.env.PORT || 3100;
const host = 'localhost';
const mongoose = require('mongoose');
const app = require('./src/app'); // Import app.js - app instance

// Use the app instance imported from app.js
// app.use('/api', appInstance);

const uri ='mongodb+srv://wlakshan888:ByteBuzzers14@cluster0.efzfkee.mongodb.net/?retryWrites=true&w=majority';

//const uri = ('mongodb://127.0.0.1:27017/employee');
const connect = async () =>{ 
    try{
       await mongoose.connect(uri); 
       console.log('Connected to mongodb');
    }
    catch(error){
        console.log('MongoDB Error: ', error);
    }
}; 

connect();

//Start server
const server = app.listen(port,host, () => { //port and host were added to variables in the top
    console.log(`Node Server listen to ${server.address().port}`); //this console log is to confirm that the server is running
});


