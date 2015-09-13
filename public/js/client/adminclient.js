var Backbone = require('backbone'),
    AdminRouter = require('./router');

var AdminClient = {
    init: function() {
        this.router = new AdminRouter();
        Backbone.history.start({
            pushState: true
        });
    }
};

var client = new AdminClient();

client.init();

module.exports = AdminClient;