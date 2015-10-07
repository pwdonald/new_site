var BaseView = require('../../base.view'),
    ProfileItemTemplate = require('./profile.dashitem.template.html');

var ProfileItemView = BaseView.extend({
	template: ProfileItemTemplate,
	tagName: 'div',
	
});

module.exports = ProfileItemView;
