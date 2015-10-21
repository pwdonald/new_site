var Datastore = require('nedb'),
    _ = require('underscore');

var Settings = new Datastore({
    filename: 'data/settings',
    autoload: true
});

var defaultSettings = {
    registration: {
        description: 'Turn user registration on or off.',
        value: false
    },
    siteName: {
        description: 'The name of the site to be used throughout the application.',
        value: 'Jones Engineering'
    }
};

exports.save = function(settings, callback) {
    if (settings._id) {
        Settings.update({
            _id: settings._id
        }, settings, function(err) {
            callback(err, settings);
        });
    } else {
        Settings.insert(_.extend(settings, defaultSettings), callback);
    }
};

exports.load = function(callback) {
    Settings.findOne({}, function(err, settings) {
        if (err) {
            return callback(err);
        }

        if (!settings) {
            return callback(null, defaultSettings);
        }

        callback(null, settings);
    });
};
