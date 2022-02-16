var express = require('express');
const path = require('path');
var jwt = require('jsonwebtoken');
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);
const AxiosWrapper = require(path.join(__dirname,".././apiHandler/AxiosWrapper.js"))
const asyncHandler = require('express-async-handler')

var router = express.Router();

// =======================================================
// INITIALIZATION
const secret = config.SECRET;
const profileService = config.ROUTE_URLS.profileService;
const profileServiceApi = AxiosWrapper(profileService);

// =======================================================
// USER REGISTERATION
router.post('/register', asyncHandler(async(req, res) => {
  let resp = await profileServiceApi.post(`/createProfile`, req.body)
  res.status(resp.status).send(resp.data)
}))

// =======================================================
// USER LOGIN
router.post('/login', asyncHandler(async(req, res) => {

  let resp = await profileServiceApi.post(`/checkUserCredentials`, req.body)
  let isAuth = resp.data.auth;
  let message = resp.data.message;
  let user_id = resp.data.user_id;
  
  if(isAuth) {
    var token = jwt.sign({ id: user_id }, secret, { expiresIn: 15 * 60 })
    res.cookie('auth', token, { httpOnly: true });
    return res.status(200).send({ auth: true, message: "Login Successful!" })
  }
  
  res.status(500).send("Internal Server Error")
}))

// =======================================================
// USER LOGOUT
router.get('/logout', asyncHandler(async(req, res) => {
  res.clearCookie("auth");
  res.end();
}))

// =======================================================
// TOKEN VERIFICATION
router.post('/verifyToken', asyncHandler(async(req, res) => {
  jwt.verify(req.body.token, secret, (err, decoded) => {
    if (err) {
      res.status(403).send({ isTokenValid: false })
    } else {
      res.status(200).send({ isTokenValid: true })
    }
  })
}))

// =======================================================

module.exports = router