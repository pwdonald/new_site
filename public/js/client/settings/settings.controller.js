var _ = require('underscore'),
    Backbone = require('backbone'),
    SettingsView = require('./settings.view'),
    SettingsModel = require('./settings.model'),
    AdminClient = require('../adminclient');

var SettingsController = function() {
    _.extend(this, Backbone.Events);

    this.model = new SettingsModel();

    this.view = new SettingsView({
        model: this.model
    });

    AdminClient.breadCrumbs[1] = {
        name: 'Settings',
        location: '/admin/settings'
    };

    this.listenTo(this.view, 'submit', function() {
        this.model.save().done(function() {
            window.displayNotification('Settings Updated!', 'alert-success');
        }).fail(function() {
            window.displayNotification('Failed to update! Please try again later.', 'alert-danger');
        });
    }, this);

    this.view.render();
    this.model.fetch();
};

module.exports = SettingsController;
