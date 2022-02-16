var express = require('express')
const path = require('path')
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);
const AxiosWrapper = require(path.join(__dirname,".././apiHandler/AxiosWrapper.js"))
const asyncHandler = require('express-async-handler')
const request = require('request');

var router = express.Router()

// =======================================================
// INITIALIZATION
const radarService = config.ROUTE_URLS.radarService;
const radarAPI = AxiosWrapper(radarService);

// =======================================================
// SERVICE ROUTING
router.get('/radar/plot', asyncHandler(async(req, res) => {
    // /radar/plot?radar_id=KAMX&date=10-10-2020&hour=15
    request({
        url: radarService+req.url,
        encoding: null
    }, 
    (err, resp, buffer) => {
        if (!err && resp.statusCode === 200){
            res.set("Content-Type", "image/png");
            res.send(resp.body);
        }
    });
}))

// =======================================================

module.exports = router