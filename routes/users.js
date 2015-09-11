var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/UserModel');

var confirmPassword = function(req, res, next) {
    var password = req.body.password,
        confirmpassword = req.body.confirmpassword;

    if (password !== confirmpassword) {
        req.flash('error', 'Passwords do not match!');
        return res.redirect('/register');
    }

    next();
};

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/blog',
        failureFlash: true,
        failureRedirect: '/login'
    }));

router.post('/register', confirmPassword, User.isUsernameAvailable, User.hashPassword, User.createNewUser, passport.authenticate('local', {
    successRedirect: '/blog',
    failureFlash: true
}));

module.exports = router;