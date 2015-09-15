var express = require('express'),
    router = express.Router(),
    User = require('../../models/usermodel');

var isAuthorized = function(req, res, next) {
    if (!req.user) {
        return res.status(401).end();
    }

    next();
};

router.put('/', isAuthorized, User.updateUserProfile, function(req, res) {
    if (!req.user) {
        res.status(500);
    }

    if (!req.user.profile) {
        res.status(500);
    }

    res.json(req.user.profile);
});

router.get('/', isAuthorized, User.getUserProfile, function(req, res) {
    if (!req.user) {
        res.status(500);
    }

    if (!req.user.profile) {
        res.status(500);
    }

    res.json(req.user.profile);
});


module.exports = router;