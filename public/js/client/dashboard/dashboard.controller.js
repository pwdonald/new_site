var Backbone = require('backbone'),
    DashboardView = require('./dashboard.view'),
    MessageView = require('../messages/message.view'),
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
        this.view = new MessageView({
            collection: this.messageCollection
        });

        this.view.render();
        this.view.collection.fetch();
    };
};

module.exports = DashboardController;