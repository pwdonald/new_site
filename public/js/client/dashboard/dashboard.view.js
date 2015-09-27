var client = require('../adminclient'),
    _ = require('underscore'),
    BaseView = require('../base.view'),
    DashboardTemplate = require('./dashboard.template.html'),
    ArticleItemView = require('./items/articles/articles.dashitem.view'),
    MessageItemView = require('./items/messages.dashitem.view');

var DashboardView = BaseView.extend({
    el: '#admin',
    template: DashboardTemplate,
    title: 'dashboard',
    mainIcon: 'unlock',

    itemViews: [],

    initialize: function(opts) {
        _.each(_.keys(opts), function(key) {
            this[key] = opts[key];
        }, this);

        if (this.model) {
            this.listenTo(this.model, 'sync', this.render);
        }

        this.on('render', function() {
            if (this.messageCollection) {
                this.itemViews.push(new MessageItemView({
                    el: '#messageItem',
                    model: this.messageCollection
                }));
            }

            if (this.articleCollection) {
                this.itemViews.push(new ArticleItemView({
                    el: '#articleItem',
                    model: this.articleCollection
                }));
            }

            _.each(this.itemViews, function(view) {
                view.render();
            });
        });
    }
});

module.exports = DashboardView;