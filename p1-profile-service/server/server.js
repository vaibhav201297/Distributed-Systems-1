const express = require('express')
const path = require('path')
const cors = require('cors');

const {setupLogging} = require(path.join(__dirname,"../middleware/logging.js"));
// const {setupResponseHeader} = require(path.join(__dirname,"../middleware/responseHeader.js"));

var router = require(path.join(__dirname,"../routers/router.js"));
var db = require(path.join(__dirname,'../db/db.js'))

// =======================================================
// SERVER SETUP
const app = express()

// =======================================================
// MIDDLEWARE SETUP
app.use(cors());

setupLogging(app);
// setupResponseHeader(app);

// =======================================================
// MICROSERVICE OPERATIONS
app.use(router)

// =======================================================
// ERROR HANDLER
app.use((error, req, res, next) => {
    res.json({ message: error.message });
})
  
module.exports = app