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
const userHistoryService = config.ROUTE_URLS.userHistoryService;
const userHistoryAPI = AxiosWrapper(userHistoryService);
const radarService = config.ROUTE_URLS.radarService;
const radarAPI = AxiosWrapper(radarService);

// =======================================================
// SERVICE ROUTING
// router.post('/search/addsearchhistory', asyncHandler(async(req, res) => {
//     req.body.userId = req.user_id.id;
//     let resp = await api.get(req.url,req.body)
//     res.send(resp.data)
// }))

router.get('/search/getsearchhistory', asyncHandler(async(req, res) => {
    let resp = await userHistoryAPI.get('search/getsearchhistory/'+req.user_id.id)
    res.send(resp.data)
}))

router.get('/search/checkifexists', asyncHandler(async(req, res) => {
    // /search/checkifexists?airport=LOUISVILLE&dateSearched=2021-04-22&hour=9&userId=ABCD1234
    let resp = await userHistoryAPI.get(req.url+`&userId=${req.user_id.id}`)

    if(resp.status == 200) {
        res.send(resp.data)
    }
    else {
        // /radar/plot?radar_id=KAMX&date=10-10-2020&hour=15
        request({
            url: radarService+req.url,
            encoding: null,
            headers: {
                "userId": req.user_id.id
            }
        }, 
        (err, resp, buffer) => {
            if (!err && resp.statusCode === 200){
                res.set("Content-Type", "image/png");
                res.send(resp.body);
            }
        });
    }
}))

// =======================================================

module.exports = router