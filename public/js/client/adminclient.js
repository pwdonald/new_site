var Backbone = require('backbone'),
    AdminRouter = require('./router');

var client = {
    init: function() {
        this.router = new AdminRouter();
        Backbone.history.start({
            pushState: true
        });
    }
};

client.init();

module.exports = client;