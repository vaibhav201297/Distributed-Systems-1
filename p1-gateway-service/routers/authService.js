/*
THIS FILE IS NOT USED. INSTEAD THE LOGIC IS MOVED TO "routes-config.js" UTILIZING HTTP-PROXY-MIDDLEWARE
*/

var express = require('express');
const path = require('path')
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);
const AxiosWrapper = require(path.join(__dirname,".././apiHandler/AxiosWrapper.js"))
const asyncHandler = require('express-async-handler')

var router = express.Router();

// =======================================================
// INITIALIZATION
const authService = config.ROUTE_URLS.authService;
const api = AxiosWrapper(authService);

// =======================================================
// UNAUTHENTICATED CALLS
// SERVICE ROUTING
router.post('/register', asyncHandler(async(req, res) => {
    let resp = await api.post(req.path, req.body)
    res.send(resp.data);
}));

// =======================================================
// USER LOGIN
router.post('/login', asyncHandler(async(req, res) => {
    let resp = await api.post(req.path, req.body)
    res.cookie('auth', resp.data.token, { httpOnly: true });
    res.send(resp.data);
}));

// =======================================================
// USER LOGOUT
router.get('/logout', asyncHandler(async(req, res) => {
    res.clearCookie("auth");
    res.end();
}));

// =======================================================
// TOKEN VERIFICATION
router.post('/verifyToken', asyncHandler(async(req, res) => {
    let resp = await api.post(req.path, req.body)
    res.send(resp.data);
}));

// =======================================================

module.exports = router;