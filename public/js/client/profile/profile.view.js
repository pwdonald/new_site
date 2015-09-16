var _ = require('underscore'),
    BaseView = require('../base.view'),
    ProfileTemplate = require('./profile.template.html');

var ProfileView = BaseView.extend({
    el: '#admin',
    template: ProfileTemplate,
    title: 'Edit Profile',
    mainIcon: 'user',

    initialize: function(opts) {
        if (this.model) {
            this.listenTo(this.model, 'sync', this.render);
        }

        this.on('render', function() {
            this.$('form').on('submit', this.submitForm.bind(this));
        }, this);
    },

    submitForm: function(e) {
        e.preventDefault();

        _.each(this.model.attributes, function(attr, key) {
            if (key !== 'id') {
                this.model.set(key, $('#' + key).val());
            }
        }.bind(this));

        this.trigger('submit');
    }
});

module.exports = ProfileView;