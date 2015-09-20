var express = require('express'),
    router = express.Router();

var alreadyLoggedIn = function(req, res, next) {
    if (req.user && req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
};

router.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.role = (req.user ? req.user.role : 0);
    res.locals.path = req.path;
    next();
});

router.get('/login', alreadyLoggedIn, function(req, res) {
    res.render('login', {
        error: req.flash('error'),
        pageName: 'login',
        pageIcon: 'user'
    });
});

router.get('/logout', function(req, res) {
    req.session.destroy(function() {
        req.logout();
        res.redirect('/');
    });
});

router.get('/register', alreadyLoggedIn, function(req, res) {
    res.render('register', {
        pageName: 'register',
        pageIcon: 'user-plus',
        error: req.flash('error')
    });
});

/* GET home page. */
router.get('/', function(req, res) {
    res.redirect('/blog');
});

router.get('/blog', function(req, res) {
    res.render('index', {
        pageName: 'blog',
        pageIcon: 'rss'
    });
});

router.get('/about', function(req, res) {
    res.render('index', {
        pageName: 'about',
        pageIcon: 'black-tie'
    });
});

router.get('/projects', function(req, res) {
    res.render('index', {
        pageName: 'projects',
        pageIcon: 'code-fork'
    });
});

router.get('/contact', function(req, res) {
    res.render('contactform', {
        pageName: 'contact',
        pageIcon: 'envelope'
    });
});

router.get('/terms', function(req, res) {
    res.render('termsandconditions', {
        pageName: 'terms and conditions',
        pageIcon: 'gavel'
    });
});

router.get('/privacy', function(req, res) {
    res.render('privacy', {
        pageName: 'privacy',
        pageIcon: 'user-secret'
    });
});

module.exports = router;