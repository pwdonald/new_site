var _ = require('underscore'),
    Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    AdminClient = require('./adminclient');

Handlebars.registerHelper('date', function(options) {
    var date = new Date(options);
    var now = new Date();

    if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
        return 'Today at ' + date.toLocaleTimeString();
    }
    return date.toLocaleDateString();
});

var BaseView = Backbone.View.extend({
    render: function() {
        if (this.collection) {
            _.each(this.collection.models, function(model) {
                if (model.get('timestamp')) {
                    model.set('timestamp', new Date(model.get('timestamp')));
                    var timestamp = model.get('timestamp');
                    var month = timestamp.getMonth() + 1;
                    var date = timestamp.getDate();
                    var year = timestamp.getFullYear();
                    var hour = timestamp.getHours();
                    var minutes = timestamp.getMinutes();
                    model.set('timestamp', month + '/' + date + '/' + year);
                    model.set('timestampTime', hour + ':' + minutes);
                }
            });
        }
        var compiledTemplate = Handlebars.compile(this.template);

        if (this.model) {
            $(this.el).html(compiledTemplate(this.model.toJSON()));
        } else {
            if (this.collection) {
                $(this.el).html(compiledTemplate({
                    models: this.collection.toJSON()
                }));
            } else {
                $(this.el).html(compiledTemplate(''));
            }
        }

        this.trigger('render');
        this.updateBreadCrumbs();
        this.linkListener();

        // TODO: move this to a higher abstraction
        AdminClient.updateSubHeader(this.title, this.mainIcon);

        return this;
    },

    updateBreadCrumbs: function() {
        var breadCrumbsList = $('.breadcrumb');

        if (AdminClient.breadCrumbs) {
            breadCrumbsList.empty();
            _.each(AdminClient.breadCrumbs, function(crumb) {
                var a = $('<a>').attr('href', crumb.location).html(crumb.name);
                var li = $('<li>').append(a);
                breadCrumbsList.append(li);
            });
        }
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
