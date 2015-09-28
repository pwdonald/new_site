var Backbone = require('backbone');

var ArticleModel = Backbone.Model.extend({
    urlRoot: '/api/article',
    defaults: {
        'title': '',
        'publishDate': '',
        'tags': '',
        'content': '',
        'published': ''
    }
});

module.exports = ArticleModel;