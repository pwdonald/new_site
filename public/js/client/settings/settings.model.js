var Backbone = require('backbone');

var SettingsModel = Backbone.Model.extend({
    urlRoot: '/api/settings',
    idAttribute: '_id'
});

module.exports = SettingsModel;
