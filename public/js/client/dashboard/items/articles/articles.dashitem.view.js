var BaseView = require('../../../base.view'),
    ArticleItemTemplate = require('./articles.dashitem.template.html');

var ArticleItemView = BaseView.extend({
    template: ArticleItemTemplate,
    tagName: 'div',

    initialize: function() {
        if (this.model) {
            this.listenTo(this.model, 'sync', this.render);
        }
    }
});

module.exports = ArticleItemView;