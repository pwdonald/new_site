var Backbone = require('backbone'),
	DashboardView = require('./dashboard.view'),
	MessageCollection = require('../messages/message.collection');

var DashboardController = function() {
	this.messageCollection = new MessageCollection();

	this.view = new DashboardView({
		messageCollection: this.messageCollection
	});

	this.view.render();
	this.messageCollection.fetch();
};

module.exports = DashboardController;