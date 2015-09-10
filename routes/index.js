var express = require('express');
var router = express.Router();

/* GET home page. */
router.use(function(req, res, next) {
    res.locals.path = req.path;
    next();
});

router.get('/', function(req, res, next) {
    res.redirect('/blog');
});

router.get('/blog', function(req, res, next) {
    res.render('index', {
        pageName: 'blog',
        pageIcon: 'rss'
    });
});

router.get('/about', function(req, res, next) {
    res.render('index', {
        pageName: 'about',
        pageIcon: 'black-tie'
    });
});

router.get('/projects', function(req, res, next) {
    res.render('index', {
        pageName: 'projects',
        pageIcon: 'code-fork'
    });
});

router.get('/contact', function(req, res, next) {
    res.render('index', {
        pageName: 'contact',
        pageIcon: 'envelope'
    });
});

router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'Login to T3nT',
        error: req.flash('error')
    });
});

router.get('/logout', function(req, res, next) {
    req.session.destroy(function() {
        req.logout();
        res.redirect('/');
    });
});

router.get('/register', function(req, res, next) {
    res.render('register', {
        title: 'Register',
        error: req.flash('error')
    });
});

module.exports = router;