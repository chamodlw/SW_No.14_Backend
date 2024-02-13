//server.js
const app = require('./src/app.js');
const port = 3100;
const host = 'localhost';

const server = app.listen(port,host, () => {
    console.log(`node server listen to ${server.address().port}`);
});

