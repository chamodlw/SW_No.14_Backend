require('dotenv').config();
const port = process.env.PORT || 3100;
const host = 'localhost';
const mongoose = require('mongoose');
const app = require('./src/app'); // Import app.js - app instance

// Import your routers
const routerAppMng = require('./src/routes/router-appmng');
const routerTMng = require('./src/routes/router-tmng');
const router = require('./src/routes/router'); // Adjust the paths as needed

const uri = 'mongodb+srv://wlakshan888:ByteBuzzers14@cluster0.efzfkee.mongodb.net/?retryWrites=true&w=majority';
const connect = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('MongoDB Error:', error);
    }
};

connect();

// Use the imported routers
app.use('/api/appmng', routerAppMng);
app.use('/api/tmng', routerTMng);
app.use('/api', router);

// Start server
const server = app.listen(port, host, () => {
    console.log(`Node Server listening on ${server.address().port}`);
});

module.exports = app;
