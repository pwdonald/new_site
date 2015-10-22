var Backbone = require('backbone');

var SettingsModel = Backbone.Model.extend({
    urlRoot: '/api/settings'
});

module.exports = SettingsModel;
