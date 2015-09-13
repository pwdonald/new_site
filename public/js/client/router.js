var Backbone = require('backbone');

var adminRouter = Backbone.Router.extend({
	routes:{
		'*default': 'dashboard'
	},

	dashboard: function() {

	}
});

module.exports = adminRouter;