var Backbone = require('backbone'),
    DashboardView = require('./dashboard.view'),
    MessageView = require('../messages/message.view'),
    MessageCollection = require('../messages/message.collection');

var DashboardController = function() {
    this.messageCollection = new MessageCollection();

    this.view = new DashboardView({
        messageCollection: this.messageCollection
    });

    this.view.render();
    this.messageCollection.fetch();

    this.showMessageList = function() {
        this.view = new MessageView({
            collection: this.messageCollection
        });

        this.view.render();
        this.view.collection.fetch();
    };
};

module.exports = DashboardController;