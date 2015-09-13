var Backbone = require('backbone'),
	DashboardController = require('./dashboard/dashboard.controller');

var adminRouter = Backbone.Router.extend({
	routes:{
		'*default': 'dashboard'
	},

	dashboard: function() {
		this.currentController = new DashboardController();
	}
});

module.exports = adminRouter;