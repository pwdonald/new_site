var _ = require('underscore'),
    BaseView = require('../base.view'),
    MessageTemplate = require('./message.template.html');

var MessageView = BaseView.extend({
    title: 'messages',
    mainIcon: 'envelope',
    tagName: 'div',
    el: '#admin',
    template: MessageTemplate,

    initialize: function(opts) {
        _.each(_.keys(opts), function(key) {
            this[key] = opts[key];
        }, this);

        if (this.collection) {
            this.listenTo(this.collection, 'sync', this.render);
        }

        this.on('render', function() {
            $('.boxTitle').on('click', this.showMessage);
        }, this);
    },

    showMessage: function() {
        if ($(this).next().hasClass('boxExpandedOpen')) {
            $(this).next().removeClass('boxExpandedOpen');
        } else {
            $(this).next().addClass('boxExpandedOpen');
        }
    }
});

module.exports = MessageView;