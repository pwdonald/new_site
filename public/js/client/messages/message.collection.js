var Backbone = require('backbone');

var MessageCollection = Backbone.Collection.extend({
	url: '/api/message'
});

module.exports = MessageCollection;