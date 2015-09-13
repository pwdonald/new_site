var Backbone = require('backbone'),
    Handlebars = require('handlebars');

var BaseView = Backbone.View.extend({
    render: function() {
        var compiledTemplate = Handlebars.compile(this.template);
        this.$el.html(compiledTemplate(this.model.toJSON()));

        return this;
    }
});

module.exports = BaseView;