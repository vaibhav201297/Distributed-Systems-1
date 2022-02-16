const express = require('express')
const path = require('path')

const {setupLogging} = require(path.join(__dirname,"../middleware/logging.js"));
// const {setupResponseHeader} = require(path.join(__dirname,"../middleware/responseHeader.js"));
const {setupSession} = require(path.join(__dirname,"../middleware/session.js"));
const {setupPassportGoogleAuth} = require(path.join(__dirname,"../middleware/passport-google.js"));

var router = require(path.join(__dirname,"../routers/router.js"));

const cookieParser = require('cookie-parser');
const cors = require('cors');

// =======================================================
// SERVER SETUP
const app = express()

// =======================================================
// MIDDLEWARE SETUP
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.use(cookieParser());

setupLogging(app);
// setupResponseHeader(app);
setupSession(app);
setupPassportGoogleAuth(app);

// =======================================================
// MICROSERVICE OPERATIONS
app.use(router)

// =======================================================
// ERROR HANDLER
app.use((error, req, res, next) => {
    res.json({ message: error.message });
})
  
module.exports = app