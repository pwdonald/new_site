var Backbone = require('backbone');

var ArticleCollection = Backbone.Collection.extend({
    url: '/api/article'
});

module.exports = ArticleCollection;