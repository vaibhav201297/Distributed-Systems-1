const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);

const TOKEN_SECRET = config.SECRET;

// =======================================================
router.get('/auth/google',
    passport.authenticate('google', { scope : ['profile', 'email'] })
);

// =======================================================
// Callback 
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
        const token = jwt.sign({ id: req.user.mongo_id }, TOKEN_SECRET, {
            expiresIn: 15 * 60,
        });

        res.cookie('auth', token, { httpOnly: true });
        res.redirect(config.UI_URL);
});

// =======================================================

module.exports = router;