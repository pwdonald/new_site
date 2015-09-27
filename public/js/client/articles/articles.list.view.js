var _ = require('underscore'),
    BaseView = require('../base.view'),
    ArticlesListTemplate = require('./articles.list.template.html');

var ArticlesListView = BaseView.extend({
    title: 'articles',
    mainIcon: 'file-text',
    tagName: 'div',
    el: '#admin',
    template: ArticlesListTemplate,

    initialize: function(opts) {
        _.each(_.keys(opts), function(key) {
            this[key] = opts[key];
        }, this);

        if (this.collection) {
            this.listenTo(this.collection, 'sync', this.render);
        }

        // this.on('render', function() {
        //     $('.boxTitle').on('click', this.showMessage);
        // }, this);
    }
});

module.exports = ArticlesListView;