var path = require('path')
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);
var session = require('express-session');

const session_secret = config.SESSION_SECRET;

const setupSession = (app) => {
    
    // setup the logger
    app.use(session({ 
        secret: session_secret, // session secret
        resave: false,
        saveUninitialized: false
    }));
    
}

exports.setupSession = setupSession