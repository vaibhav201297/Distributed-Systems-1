const app = require(__dirname+'/server/server.js');
const path = require('path')
require('dotenv').config();
var config = require(path.join(__dirname,'/config.js')).get(process.env.NODE_ENV);

// =======================================================
// SERVER START
const port = config.APP.PORT;
app.listen(port, (error) => {
    if (error) {
        console.error('Error starting server: ', error);
    } else {
        console.log(`Server started at http://localhost:${port}`);
    }
})
