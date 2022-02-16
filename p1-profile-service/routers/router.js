var express = require('express');
const path = require('path')
var bodyParser = require('body-parser');
var profileRouter = require(path.join(__dirname,"../routers/profile.js"))
const asyncHandler = require('express-async-handler')

var router = express.Router()

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.get('/', asyncHandler(async(req, res, next) => {
    res.status(200).send("PROFILE SERVICE")
}));

router.use(profileRouter)

module.exports = router