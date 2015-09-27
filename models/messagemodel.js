var _ = require('underscore'),
    Datastore = require('nedb');


var Message = new Datastore({
    filename: 'data/messages',
    autoload: true
});

var requiredFields = [
    'ip',
    'firstName',
    'lastName',
    'email',
    'confirmEmail',
    'dayPhone',
    'message'
];

var validateInputString = function(str) {
    if (str && str.trim() !== '') {
        return true;
    }

    return false;
};

exports.findById = function(id, callback) {
    Message.findOne({
        _id: id
    }, callback);
};

exports.find = function(query, callback) {
    Message.find(query, callback);
};

exports.saveMessage = function(message, callback) {
    message = _.pick(message, 'eveningPhone', requiredFields);

    this.validate(message, function(invalid) {
        if (invalid && invalid.length > 0) {
            return callback(invalid);
        }

        message.timestamp = new Date();
        message.read = false;

        Message.insert(message, function(err, savedMessage) {
            if (err) {
                return callback(err);
            }

            callback(null, savedMessage);
        });
    });
};

exports.validate = function(message, callback) {
    var invalid = requiredFields.filter(function(field) {
        if (!message[field] || !validateInputString(message[field])) {
            return field;
        }
    }, this);

    callback(invalid);
};