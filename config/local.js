var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('../models/usermodel');

var validateUser = function(username, password, callback) {
    checkUsername(username, password, checkPassword, callback.bind(this));
};

var checkUsername = function(username, password, next, callback) {
    User.findByUsername(username, function(err, user) {
        if (err) {
            return callback(err);
        }

        if (!user) {
            return callback(null, false, {
                message: 'invalid username!'
            });
        }

        next(user, password, callback);
    });
};

var checkPassword = function(user, password, next) {
    User.checkPassword(user, password, function(err, success) {
        if (err) {
            return next(err);
        }

        if (!success) {
            return next(null, false, {
                message: 'Incorrect credentials!'
            });
        }

        next(null, user);
    });
};

module.exports = function() {
    passport.use(new LocalStrategy(validateUser));

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};