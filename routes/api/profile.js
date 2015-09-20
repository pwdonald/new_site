var _ = require('underscore'),
    express = require('express'),
    router = express.Router(),
    isAuthorized = require('../../middleware/isAuthorized'),
    User = require('../../models/usermodel');

router.put('/', isAuthorized, User.updateUserProfile, function(req, res) {
    if (!req.user) {
        res.status(500);
    }

    if (!req.body) {
        res.status(500);
    }

    res.status(204).end();
});

router.get('/', isAuthorized, User.getUserProfile, function(req, res) {
    if (!req.user) {
        res.status(500);
        return;
    }

    if (!req.user.profile) {
        res.status(500);
        return;
    }

    res.json(_.extend(req.user.profile, {
        id: req.user._id
    }));
});


module.exports = router;