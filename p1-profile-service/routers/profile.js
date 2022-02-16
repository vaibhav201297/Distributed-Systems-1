var express = require('express');
const path = require('path');
var bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')

var User = require(path.join(__dirname,'../model/user.js'));

var router = express.Router();

// =======================================================
// GET USER PROFILE
router.get('/getProfileById', asyncHandler(async(req, res) => {
    
    let user = await User.findOne({ _id: req.query.id })
    if (!user) return res.status(404).send("User not found")
    
    if(user) {
        let userObj = {
            "name": user.name,
            "email": user.email,
        }
        res.status(200).send(userObj)
    }

}))

// =======================================================
// UPDATE USER PROFILE
router.post('/updateProfileById', asyncHandler(async(req, res) => {

    let user = await User.findOne({ _id: req.body.id })
    if (!user) return res.status(404).send("User not found")

    if(user) {
        
        let updObj = {}
        if(req.body.name && user.name != req.body.name) {
            updObj['name'] = req.body.name
        }
        if(req.body.password) {
            let hashedPassword = bcrypt.hashSync(req.body.password, 8)
            if(user.password != hashedPassword) 
                updObj['password'] = hashedPassword
        }
        
        let user2 = await User.updateOne({_id: req.body.id},
        {
            $set : updObj
        },
        {upsert : false})
        
        res.status(200).send("User profile updated!")

    } 
}))

// =======================================================
// CREATE USER PROFILE
router.post('/createProfile', asyncHandler(async(req, res) => {
    
    let user = await User.findOne({ email: req.body.email })
    if(user) {
        if(req.body.profileType == "googleOAuth") {
            return res.status(200).send(user._id)
        }
        return res.status(409).send("User already exists")
    }
    else {
        let hashedPassword = bcrypt.hashSync(req.body.password, 8)
        
        let insertObj = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            profileType: req.body.profileType
        }
        
        let user2 = await User.create(insertObj)    
        if(req.body.profileType == "googleOAuth") {
            return res.status(200).send(user2._id)
        }
        return res.status(200).send({ message: "Registration completed!" })
    }
  
}))

// =======================================================
// COMPARE USER PASSWORD
router.post('/checkUserCredentials', asyncHandler(async(req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).send("User not found")
        
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) return res.status(401).send({ auth: false, message: "Password Mismatch!"})
    
    res.status(200).send({ auth: true, message: "User credentials validated!", user_id: user._id })
    
}))

// =======================================================

module.exports = router