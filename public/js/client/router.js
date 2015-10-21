var Backbone = require('backbone'),
    EditorController = require('./articles/editor.controller'),
    DashboardController = require('./dashboard/dashboard.controller'),
    ProfileController = require('./profile/profile.controller'),
    SettingsController = require('./settings/settings.controller');

var adminRouter = Backbone.Router.extend({
    routes: {
        'articles': 'articles',
        'messages': 'messages',
        'profile/edit': 'profile',
        'settings': 'settings',
        'article/editor/(:id)': 'editor',
        '*default': 'dashboard'
    },

    editor: function(id) {
        this.currentController = new EditorController({
            id: id
        });
    },

    dashboard: function() {
        this.currentController = new DashboardController();
    },

    profile: function() {
        this.currentController = new ProfileController();
    },

    settings: function() {
        this.currentController = new SettingsController();
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
