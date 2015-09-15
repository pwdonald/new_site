var Backbone = require('backbone'),
    EditorController = require('./articles/editor.controller'),
    DashboardController = require('./dashboard/dashboard.controller'),
    ProfileController = require('./profile/profile.controller');

var adminRouter = Backbone.Router.extend({
    routes: {
        'profile/edit': 'profile',
        'article/editor/(:id)': 'editor',
        '*default': 'dashboard'
    },

    editor: function(id) {
        this.currentController = new EditorController(id);
    },

    dashboard: function() {
        this.currentController = new DashboardController();
    },

    profile: function() {
        this.currentController = new ProfileController();
    }
});

module.exports = adminRouter;