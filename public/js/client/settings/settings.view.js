var _ = require('underscore'),
    BaseView = require('../base.view'),
    SettingsTemplate = require('./settings.template.html');

var SettingsView = BaseView.extend({
    title: 'settings',
    mainIcon: 'cogs',
    tagName: 'div',
    el: '#admin',
    template: SettingsTemplate,

    initialize: function(opts) {
        _.each(_.keys(opts), function(key) {
            this[key] = opts[key];
        }, this);

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

module.exports = SettingsView;
