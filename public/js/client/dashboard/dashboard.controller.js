var Backbone = require('backbone'),
    DashboardView = require('./dashboard.view'),
    MessageListView = require('../messages/message.view'),
    ArticlesListView = require('../articles/articles.list.view'),
    ArticleCollection = require('../articles/article.collection'),
    MessageCollection = require('../messages/message.collection'),
    AdminClient = require('../adminclient');

var DashboardController = function() {
    this.messageCollection = new MessageCollection();
    this.articleCollection = new ArticleCollection();

    this.view = new DashboardView({
        articleCollection: this.articleCollection,
        messageCollection: this.messageCollection
    });

    AdminClient.breadCrumbs = [AdminClient.breadCrumbs[0]];

    this.view.render();
    this.messageCollection.fetch();
    this.articleCollection.fetch();

    this.showMessageList = function() {
        this.view = new MessageListView({
            collection: this.messageCollection
        });

        AdminClient.breadCrumbs[1] = {
            name: 'Messages',
            location: '/admin/messages'
        };

        this.view.render();
        this.view.collection.fetch();
    };

    this.showArticlesList = function() {
        this.view = new ArticlesListView({
            collection: this.articleCollection
        });


        AdminClient.breadCrumbs[1] = {
            name: 'Articles',
            location: '/admin/articles'
        };

        this.view.render();
        this.view.collection.fetch();
    }
};

module.exports = DashboardController;
