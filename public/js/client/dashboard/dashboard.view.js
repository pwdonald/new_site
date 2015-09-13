var BaseView = require('../base.view'),
	DashboardTemplate = require('./dashboard.template.html'),
	MessageItemView = require('./items/messages.dashitem.view');

var DashboardView = BaseView.extend({
	el: '#admin',
	template: DashboardTemplate,

	itemViews: [],

	initialize: function() {
		if (this.model) {
			this.listenTo(this.model, 'sync', this.render);
			if (this.messageCollection) {
					itemViews.push(new MessageItemView({
					model: this.messageCollection
				}.bind(this)));
			}
			this.on('render', function() {
				this.itemViews.each(function(view) {
					view.render();
				});
			});
		}
	}
});

module.exports = DashboardView;