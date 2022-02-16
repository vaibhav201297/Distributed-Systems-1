var express = require('express');
const path = require('path')
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);
const AxiosWrapper = require(path.join(__dirname,".././apiHandler/AxiosWrapper.js"))
const asyncHandler = require('express-async-handler')

var router = express.Router();

// =======================================================
// INITIALIZATION
const profileService = config.ROUTE_URLS.profileService;
const api = AxiosWrapper(profileService);

// =======================================================
// SERVICE ROUTING
// =======================================================
router.get('/getProfile', asyncHandler(async(req, res) => {
    let resp = await api.get(`getProfileById?id=${req.user_id.id}`);
    res.send(resp.data);
}));

// =======================================================
router.post('/updateProfile',asyncHandler(async(req, res) => {
    req.body.id = req.user_id.id;
    let resp = await api.post("updateProfileById", req.body);
    res.send(resp.data);
}));

// =======================================================

module.exports = router;