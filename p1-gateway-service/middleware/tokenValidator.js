var jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);

// =======================================================
// INITIALIZATION
const secret = config.SECRET;

// =======================================================
module.exports = async(req, res, next) => {
  if(req.cookies) {
    if (!req.cookies['auth']) {
      res.status(401).send("Unauthorized")
    } else {
      jwt.verify(req.cookies['auth'], secret, (err, decoded) => {
        if (err) {
          res.status(403).send("Forbidden")
        } else {
          req.user_id = decoded;
          console.log("Decoded ID:",decoded);
          next()
        }
      })
    }
  }
}