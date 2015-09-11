var Datastore = require('nedb'),
    Message = new Datastore({
        filename: 'data/messages'
    });

var requiredFields = function() {
    return [
        'first',
        'last',
        'email',
        'confirmEmail',
        'dayPhone',
        'message'
    ];
};

var validateInputString = function(str) {
    if (str && str.trim() !== '') {
        return true;
    }

    return false;
};

exports.findById = function(id, callback) {

};

exports.find = function(query, callback) {

};

exports.validate = function(req, res, next) {
    var missingFields = requiredFields();

    if (!req.body) {
        req.flash('error', {
            message: 'Submission Error.',
            fields: missingFields
        });
        return res.redirect('/contact');
    }

    if (validateInputString(req.body.first)) {
        missingFields.pop();
    }

    if (validateInputString(req.body.last)) {
        missingFields.pop();
    }

    if (validateInputString(req.body.email)) {
        var email = req.body.email;

        missingFields.pop();

        if (validateInputString(req.body.confirmEmail)) {
            var confirm = req.body.confirmEmail;

            if (email === confirm) {
                missingFields.pop();
            }
        };
    }

    if (validateInputString(req.body.dayPhone)) {

    };
};