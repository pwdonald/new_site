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
        this.handleUserLinks();
        AdminClient.updateSubHeader(this.title, this.mainIcon);

        return this;
    },

    handleUserLinks: function() {
        $('a#profile').on('click', function(e) {
            e.preventDefault();
            AdminClient.router.navigate('/profile/edit', {
                trigger: true
            });
        });

        $('a#admin').on('click', function(e) {
            e.preventDefault();
            AdminClient.router.navigate('/admin', {
                trigger: true
            });
        });
    }
});

module.exports = BaseView;