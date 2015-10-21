var BaseView = require('../../base.view'),
    SettingsItemTemplate = require('./settings.dashitem.template.html');

var SettingsItemView = BaseView.extend({
	template: SettingsItemTemplate,
	tagName: 'div',
	
});

module.exports = SettingsItemView;
