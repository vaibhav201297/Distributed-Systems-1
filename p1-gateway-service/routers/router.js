var express = require('express');
const path = require('path')
var bodyParser = require('body-parser');
const asyncHandler = require('express-async-handler')

var userHistoryRouter = require(path.join(__dirname,"../routers/userHistoryService.js"))
var radarRouter = require(path.join(__dirname,"../routers/radarService.js"))
var profileRouter = require(path.join(__dirname,"../routers/profileService.js"))
var tokenValidator = require(path.join(__dirname,"../middleware/tokenValidator.js"));

var router = express.Router()

// =======================================================
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.get('/', asyncHandler(async(req, res, next) => {
    res.status(200).send("API GATEWAY")
}));

// AUTHENTICATION HANDLER FOR BELOW ROUTERS
router.use(tokenValidator)

router.use(profileRouter)
router.use(userHistoryRouter)
router.use(radarRouter)

// =======================================================

module.exports = router