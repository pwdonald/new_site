var Backbone = require('backbone'),
    EditorView = require('./editor.view');

var EditorController = function() {
    this.view = new EditorView();

    this.view.render();
};

module.exports = EditorController;