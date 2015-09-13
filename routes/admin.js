var express = require('express'),
    router = express.Router();

var isLoggedIn = function(req, res, next) {
    if (req.user && req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
};

router.get('/*', isLoggedIn, function(req, res) {
	res.render('admin', {
		title: 'Admin',
		pageName: 'dashboard',
		pageIcon: 'unlock'
	});
});

module.exports = router;