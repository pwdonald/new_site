var Backbone = require('backbone'),
    AdminRouter = require('./router');

Backbone.$ = window.$;

var client = {
    init: function() {
        this.router = new AdminRouter();
        Backbone.history.start({
            root: '/admin/',
            pushState: true
        });
    }
};

client.init();

module.exports = client;