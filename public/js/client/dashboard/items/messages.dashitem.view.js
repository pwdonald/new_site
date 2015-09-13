var BaseView = require('../../base.view'),
	MessageItemTemplate = require('./messages.dashitem.template.html');

var MessageItemView = BaseView.extend({
	template: MessageItemTemplate,
	tagName: 'div',

	initialize: function() {
		if (this.model) {
			this.listenTo(this.model, 'sync', this.render);
		}
	}
});

module.exports = MessageItemView;