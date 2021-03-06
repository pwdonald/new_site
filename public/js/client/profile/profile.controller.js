var _ = require('underscore'),
    Backbone = require('backbone'),
    ProfileView = require('./profile.view'),
    AdminClient = require('../adminclient');

var ProfileController = function() {
    _.extend(this, Backbone.Events);
    this.Profile = Backbone.Model.extend({
        url: '/api/profile',
        defaults: {
            fullName: '',
            alias: '',
            publicEmail: '',
            location: '',
            avatarUrl: '',
            bio: ''
        }
    });

    this.model = new this.Profile();

    this.view = new ProfileView({
        model: this.model
    });

    AdminClient.breadCrumbs[1] = {
        name: 'Profile',
        location: '/admin/profile/editor'
    };

    this.listenTo(this.view, 'submit', function() {
        this.model.save().done(function() {
            window.displayNotification('Profile Updated!', 'alert-success');
        }).fail(function() {
            window.displayNotification('Failed to update! Please try again later.', 'alert-danger');
        });
    }, this);

    this.view.render();
    this.model.fetch();
};

module.exports = ProfileController;
