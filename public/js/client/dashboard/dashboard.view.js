var _ = require('underscore'),
	BaseView = require('../base.view'),
	DashboardTemplate = require('./dashboard.template.html'),
	MessageItemView = require('./items/messages.dashitem.view');

var DashboardView = BaseView.extend({
	el: '#admin',
	template: DashboardTemplate,

	itemViews: [],

	initialize: function(opts) {
		_.each(_.keys(opts), function(key) {
			this[key] = opts[key];
		}, this);

		if (this.model) {
			this.listenTo(this.model, 'sync', this.render);
		}

		this.on('render', function() {
			if (this.messageCollection) {
				this.itemViews.push(new MessageItemView({
					el: $('#dashitems'),
					model: this.messageCollection
				}));
			}
			_.each(this.itemViews, function(view) {
				view.render();
			});
		});
	}
});

module.exports = DashboardView;