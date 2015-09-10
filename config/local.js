var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('../models/UserModel');

module.exports = function() {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findByUsername(username, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {
                        message: 'Username not found!'
                    });
                }

                User.CheckPassword(user, password, function(err, success) {
                    if (err) {
                        return done(err);
                    }

                    if (!success) {
                        return done(null, false, {
                            message: 'Incorrect credentials!'
                        });
                    }

                    return done(null, user);
                });
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.FindById(id, function(err, user) {
            done(err, user);
        });
    });
};