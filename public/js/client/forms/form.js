var _ = require('underscore'),
    Backbone = require('backbone');

var FormModel = Backbone.Model.extend({
    urlRoot: '/api/messsage',

    defaults: {
        'firstName': '',
        'lastName': '',
        'email': '',
        'confirmEmail': '',
        'dayPhone': '',
        'eveningPhone': '',
        'message': ''
    },

    required: [
        'firstName',
        'lastName',
        'email',
        'confirmEmail',
        'dayPhone',
        'message'
    ],

    mustMatch: {
        email: ['email', 'confirmEmail']
    },

    validate: function(attrs) {
        var errors = [];

        _.each(_.pick(attrs, this.required), function(attr, key) {
            if (!attr || attr.trim() === '') {
                errors.push({
                    name: key,
                    message: key + ' is required!'
                });
            }
        }, this);

        _.each(this.mustMatch, function(matchCase) {
            var matchVal = _.pick(attrs, matchCase);
            var mappedMatch = _.map(matchVal, function(match, key) {
                return {
                    key: key,
                    value: match
                };
            });
            var remaining = _.groupBy(_.pick(attrs, matchCase), function(value) {
                return value;
            });
            if (remaining && _.size(remaining) > 1) {
                _.map(remaining, function(remainingCase, key) {
                    errors.push({
                        name: _.pluck(remainingCase, 'key'),
                        message: key + ' must match ' + _.flatten(_.map(matchCase, _.keys))
                    });
                }, this);
            }
        }, this);

        return errors;
    }
});

module.exports = FormModel;