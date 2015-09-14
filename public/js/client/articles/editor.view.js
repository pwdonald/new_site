var BaseView = require('../base.view'),
    EditorTemplate = require('./editor.template.html'),
    marked = require('marked');

var EditorView = BaseView.extend({
    updateTimer: 0,
    md: '',

    el: '#admin',
    tagName: 'div',
    template: EditorTemplate,

    initialize: function() {
        this.on('render', function() {
            this.$('#textedit').on('input', this.compile);
        }, this);
    },

    compile: function(evt) {
        var rendered = $('#rendered');
        var editor = $('#textedit');
        setTimeout(function() {
            this.md = editor.val();

            rendered.html(marked(this.md));
        }, 1000, this);
    }
});

module.exports = EditorView;