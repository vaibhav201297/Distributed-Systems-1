const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
var helmet = require('helmet');
const cors = require('cors');

const {ROUTES} = require(path.join(__dirname,"../routes-config.js"));
const {setupProxies} = require(path.join(__dirname,"../middleware/proxy.js"));
const {setupLogging} = require(path.join(__dirname,"../middleware/logging.js"));
// const {setupResponseHeader} = require(path.join(__dirname,"../middleware/responseHeader.js"));
var router = require(path.join(__dirname,"../routers/router.js"));


// =======================================================
// SERVER SETUP
const app = express()

// =======================================================
// MIDDLEWARE SETUP
app.use(cors({ credentials: true, origin: 'http://localhost:4200', allowedHeaders: ['Content-Type','Accept','Authorization'] }));
app.use(helmet());
app.use(cookieParser());

setupLogging(app);
setupProxies(app, ROUTES);
// setupResponseHeader(app);

// =======================================================
// MICROSERVICE ROUTING
app.use(router)

// =======================================================
// ERROR HANDLER
app.use((error, req, res, next) => {
    res.json({ message: error.message });
})
  
module.exports = app