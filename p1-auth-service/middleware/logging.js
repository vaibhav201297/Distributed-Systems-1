const morgan = require("morgan")
var path = require('path')
var rfs = require('rotating-file-stream') // version 2.x

const setupLogging = (app) => {

    // create a rotating write stream
    var accessLogStream = rfs.createStream('access.log', {
        interval: '1d', // rotate daily
        path: path.join(__dirname, '../log')
    })
    
    // setup the logger
    app.use(morgan('combined', { 
        // stream: accessLogStream,
        skip: function (req, res) { return res.statusCode < 400 }   // Skipping non-error logs
    }))
    
}

exports.setupLogging = setupLogging