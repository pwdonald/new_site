var express = require('express'),
    router = express.Router();

var isLoggedIn = function(req, res, next) {
    if (req.user && req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
};

router.get('/article/editor/*', isLoggedIn, function(req, res) {
    res.render('admin', {
        title: 'Editor',
        pageName: 'editor',
        pageIcon: 'file-text'
    });
});

router.get('/profile/edit/', isLoggedIn, function(req, res) {
    res.render('admin', {
        title: 'Edit Profile',
        pageName: 'Profile',
        pageIcon: 'user'
    });
});

router.get('/*', isLoggedIn, function(req, res) {
    res.render('admin', {
        title: 'Admin',
        pageName: 'dashboard',
        pageIcon: 'unlock'
    });
});

module.exports = router;