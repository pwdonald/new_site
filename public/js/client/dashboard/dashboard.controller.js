var Backbone = require('backbone'),
    DashboardView = require('./dashboard.view'),
    MessageListView = require('../messages/message.view'),
    ArticlesListView = require('../articles/articles.list.view'),
    ArticleCollection = require('../articles/article.collection'),
    MessageCollection = require('../messages/message.collection');

var DashboardController = function() {
    this.messageCollection = new MessageCollection();
    this.articleCollection = new ArticleCollection();

    this.view = new DashboardView({
        articleCollection: this.articleCollection,
        messageCollection: this.messageCollection
    });

    this.view.render();
    this.messageCollection.fetch();
    this.articleCollection.fetch();

    this.showMessageList = function() {
        this.view = new MessageListView({
            collection: this.messageCollection
        });

        this.view.render();
        this.view.collection.fetch();
    };

    this.showArticlesList = function() {
        this.view = new ArticlesListView({
            collection: this.articleCollection
        });

        this.view.render();
        this.view.collection.fetch();
    }
};

module.exports = DashboardController;