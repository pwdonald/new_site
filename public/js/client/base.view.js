var Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    AdminClient = require('./adminclient');

var BaseView = Backbone.View.extend({

    render: function() {
        var compiledTemplate = Handlebars.compile(this.template);
        if (this.model) {
            $(this.el).html(compiledTemplate(this.model.toJSON()));
        } else {
            $(this.el).html(compiledTemplate(''));
        }

        this.trigger('render');
        this.linkListener();

        // TODO: move this to a higher abstraction
        AdminClient.updateSubHeader(this.title, this.mainIcon);

        return this;
    },

    linkListener: function() {
        $('a').on('click', function(event) {
            if (!$(this).attr('data-bypass')) {
                event.preventDefault();

                var route = $(this).attr('href');
                var rootIndex = Backbone.history.options.root.length - 1;
                route = route.substr(rootIndex);

                AdminClient.router.navigate(route, {
                    trigger: true
                });
            }
        });
    }
});

module.exports = BaseView;