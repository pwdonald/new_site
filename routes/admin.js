var express = require('express'),
    isLoggedIn = require('../middleware/isLoggedIn'),
    router = express.Router();

router.get('/*', isLoggedIn, function(req, res) {
    res.render('admin');
});

module.exports = router;