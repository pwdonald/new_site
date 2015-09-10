var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/UserModel');

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

router.post('/register', User.IsUsernameAvailable, User.HashPassword, User.CreateNewUser, passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: true
}));

module.exports = router;