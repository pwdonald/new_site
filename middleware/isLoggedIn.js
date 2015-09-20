var isLoggedIn = function(req, res, next) {
    if (req.user && req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = isLoggedIn;