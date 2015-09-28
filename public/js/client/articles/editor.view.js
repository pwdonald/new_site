var _ = require('underscore'),
    BaseView = require('../base.view'),
    EditorTemplate = require('./editor.template.html'),
    marked = require('marked');

var EditorView = BaseView.extend({
    updateTimer: 0,
    md: '',

    el: '#admin',
    title: 'editor',
    mainIcon: 'file-text',
    tagName: 'div',
    template: EditorTemplate,

    initialize: function() {
        if (this.model) {
            this.listenTo(this.model, 'sync', this.render);
        }
        this.on('render', function() {
            this.$('#title').on('input', this.compile);
            this.$('#content').on('input', this.compile);
            this.$('form').on('submit', this.submit.bind(this));
        }, this);
    },

    submit: function(event) {
        event.preventDefault();

        _.each(this.model.attributes, function(attr, key) {
            var value = $('#' + key).val();
            if (value !== undefined) {
                if (key !== 'id') {
                    this.model.set(key, value);
                }
            }
        }.bind(this));

        this.model.set('published', this.$('#publishedSetting:checked').val());

        this.trigger('submit');
    },

    compile: function(evt) {
        var rendered = $('#rendered');
        var articleName = $('#title');
        var editor = $('#content');
        setTimeout(function() {
            this.md = '# ' + articleName.val() + '\r\n' + editor.val();

            rendered.html(marked(this.md));
        }, 1000, this);
    }
});

module.exports = EditorView;