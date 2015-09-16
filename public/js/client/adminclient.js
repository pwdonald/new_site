var Backbone = require('backbone'),
    AdminRouter = require('./router');

Backbone.$ = window.$;

var client = {
    init: function() {
        this.updateSubHeader = function(title, icon) {
            if (title) {
                $('.subhead').html(title);
            }

            if (icon) {
                $('#mainIcon').removeClass();
                $('#mainIcon').attr('class', 'fa fa-' + icon);
            }
        };
        this.router = new AdminRouter();
        Backbone.history.start({
            root: '/admin/',
            pushState: true
        });
    }.bind(this)
};

client.init();

module.exports = client;