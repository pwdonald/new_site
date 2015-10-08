var _ = require('underscore'),
    Backbone = require('backbone'),
    Router = require('../router'),
    EditorView = require('./editor.view'),
    ArticleModel = require('./article.model');

var EditorController = function(options) {
    _.extend(this, Backbone.Events);

    var id = (options && options.id ? options.id : 0);

    if (options.id) {
        this.model = new ArticleModel({
            id: id
        });
    } else {
        this.model = new ArticleModel();
    }

    this.view = new EditorView({
        model: this.model
    });

    this.listenTo(this.model, 'sync', function() {
        if (this.model.get(publishDate)) {
            var publishDate = new Date(publishDate);
            this.model.set(publishDate, publishDate.toLocaleDateString());
            this.render();
        }
    }.bind(this));

    this.listenTo(this.view, 'submit', function() {
        this.model.save().done(function() {
            Backbone.history.navigate('/articles', {
                trigger: true
            });
            window.displayNotification('Article saved!', 'alert-success');
        }).fail(function() {
            window.displayNotification('Failed to save! Please try again later.', 'alert-danger');
        });
    }, this);

    this.view.render();
    this.model.fetch();
};

module.exports = EditorController;
