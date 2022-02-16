var mongoose = require('mongoose')
const path = require('path')
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);

const mongo_uri = config.DATABASE;

mongoose.connect(mongo_uri)