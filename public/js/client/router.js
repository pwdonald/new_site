var Backbone = require('backbone'),
    EditorController = require('./articles/editor.controller'),
    DashboardController = require('./dashboard/dashboard.controller');

var adminRouter = Backbone.Router.extend({
    routes: {
        'article/editor/(:id)': 'editor',
        '*default': 'dashboard'
    },

    editor: function(id) {
        this.currentController = new EditorController(id);
    },

    dashboard: function() {
        this.currentController = new DashboardController();
    }
});

module.exports = adminRouter;