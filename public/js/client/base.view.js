var Backbone = require('backbone'),
    Handlebars = require('handlebars');

var BaseView = Backbone.View.extend({
    render: function() {
        var compiledTemplate = Handlebars.compile(this.template);
        if (this.model) {
        	$(this.el).html(compiledTemplate(this.model.toJSON()));
        } else {
        	$(this.el).html(compiledTemplate(''));
        }

        this.trigger('render');

        return this;
    }
});

module.exports = BaseView;