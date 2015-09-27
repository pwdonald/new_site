var Backbone = require('backbone'),
    EditorController = require('./articles/editor.controller'),
    DashboardController = require('./dashboard/dashboard.controller'),
    ProfileController = require('./profile/profile.controller');

var adminRouter = Backbone.Router.extend({
    routes: {
        'articles': 'articles',
        'messages': 'messages',
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
    },

    messages: function() {
        this.currentController = new DashboardController();
        this.currentController.showMessageList();
    },

    articles: function() {
        this.currentController = new DashboardController();
        this.currentController.showArticlesList();
    }
});

module.exports = adminRouter;