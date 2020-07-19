const passport = require("passport");
const GoogleStartegy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id); //this id is the object id as user can have multiple profiles like google, fb etc.
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) => {
        done(null, user);
    })
});

passport.use(
    new GoogleStartegy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id})
            if(existingUser){
                //user exists
                done(null, existingUser);
            }
            else{
                //create new
                const user = await new User({googleId: profile.id}).save()
                done(null, user);
            }
        }
    )
);