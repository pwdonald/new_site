var Datastore = require('nedb'),
    bcrypt = require('bcrypt');

var User = new Datastore({
    filename: 'data/users'
});

exports.findById = function(id, callback) {
    User.loadDatabase(function(err) {
        if (err) {
            return err;
        }

        User.findOne({
            _id: id
        }, callback);
    });
};

exports.findByUsername = function(username, callback) {
    User.loadDatabase(function(err) {
        User.findOne({
            username: username
        }, function(err, user) {
            callback(err, user);
        });
    });
};

exports.isUsernameAvailable = function(req, res, next) {
    User.loadDatabase(function(err) {
        User.findOne({
            username: req.body.username
        }, function(err, user) {
            if (err) {
                return next(err);
            }

            if (user) {
                // not available
                req.flash('error', 'Username invalid.');
                return res.redirect('/register');
            }

            next();
        });
    });
};

exports.hashPassword = function(req, res, next) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hashedPassword) {
            req.body.hashedPassword = hashedPassword;
            next();
        });
    });
};

exports.checkPassword = function(user, password, callback) {
    bcrypt.compare(password, user.password, callback);
};

exports.createNewUser = function(req, res, next) {
    User.loadDatabase(function(err) {
        User.insert({
            username: req.body.username,
            password: req.body.hashedPassword,
            role: 0,
            profile: {
                fullName: '',
                alias: '',
                publicEmail: '',
                location: '',
                avatarUrl: '',
                bio: ''
            },
            timestamp: new Date()
        }, function(err, user) {
            if (err) {
                next(err);
            }

            req.body.username = user.username;

            next();
        });
    });
};

exports.getUserProfile = function(req, res, next) {
    User.loadDatabase(function(err) {
        User.findOne({
            _id: req.user._id
        }, function(err, user) {
            if (err) {
                next(err);
            }

            if (!user) {
                res.status(500).end();
                return;
            }

            req.body.profile = user.profile || {};

            next();
        });
    });
};

exports.updateUserProfile = function(req, res, next) {
    User.loadDatabase(function(err) {
        User.update({
            _id: req.user._id
        }, {
            $set: {
                profile: req.body
            }
        }, function(err, num) {
            if (err) {
                next(err);
            }

            if (num < 0) {
                res.status(500).end();
            }

            next();
        });
    });
};