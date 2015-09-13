var _ = require('underscore'),
	Backbone = require('backbone');

var FormModel = Backbone.Model.extend({
	requiredFields: [],

	initialize: function(opts) {
		
	},


	validate: function(attrs) {
		return _.chain(_.pick(attrs, this.requiredFields))
			.filter(function(attr) {
				return !attr || attr.trim() === '';
			})
			.map(function(val, key) {
				return {
					field: key,
					message: key + ' must contain a value!'
				};
			});
	}
});

module.exports = FormModel;