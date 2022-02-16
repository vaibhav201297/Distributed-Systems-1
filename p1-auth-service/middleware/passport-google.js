const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');
var crypto = require("crypto");

const AxiosWrapper = require(path.join(__dirname,".././apiHandler/AxiosWrapper.js"))

require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);

const google_auth_client_id = config.GOOGLE_AUTH.CLIENT_ID;
const google_auth_client_secret = config.GOOGLE_AUTH.CLIENT_SECRET;
const google_auth_callback_url = config.GOOGLE_AUTH.CALLBACK_URL

const profileService = config.ROUTE_URLS.profileService;
const profileServiceApi = AxiosWrapper(profileService);

const setupPassportGoogleAuth = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });
    
    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });
    
    passport.use(new GoogleStrategy({
            clientID: google_auth_client_id,
            clientSecret: google_auth_client_secret,
            callbackURL: google_auth_callback_url
        },
        function(accessToken, refreshToken, profile, done) {
            // here you can create a user in the database if you want to

            console.log(profile.name, profile.emails[0].value);
            let body = {
                "name": profile.displayName,
                "email": profile.emails[0].value,
                "password": crypto.randomBytes(20).toString('hex'),
                "profileType": "googleOAuth"
            }


            profileServiceApi.post(`/createProfile`, body)
            .then(resp => {
                // console.log(resp);
                // console.log("profile",profile);
                profile.mongo_id = resp.data;            
                return done(null, profile);
            })
            .catch(function (error) {
                return done(null, profile);
            });

        }
    ));
    
}

exports.setupPassportGoogleAuth = setupPassportGoogleAuth