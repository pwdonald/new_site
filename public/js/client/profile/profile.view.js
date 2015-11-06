var _ = require('underscore'),
    BaseView = require('../base.view'),
    ProfileTemplate = require('./profile.template.html');

var ProfileView = BaseView.extend({
    el: '#admin',
    template: ProfileTemplate,
    title: 'Edit Profile',
    mainIcon: 'user',

    initialize: function(opts) {
        if (this.model) {
            this.listenTo(this.model, 'sync', this.render);
        }

        this.on('render', function() {
            this.$('form').on('submit', this.submitForm.bind(this));
            this.$('#avatar').on('change', this.previewAvatar.bind(this));
        }, this);
    },

    previewAvatar: function() {
        var preview = this.$('#avatarImage')
        var reader = new FileReader();
        var avatarFile = document.getElementById('avatar');

        if (avatarFile.files && avatarFile.files.length > 0) {
            avatarFile = avatarFile.files[0];
        }

        reader.onload = function() {
            preview.attr('src', reader.result);
            this.model.set('avatarData', reader.result);
        }.bind(this)

        if (avatarFile) {
            reader.readAsDataURL(avatarFile);
        } else {
            preview.src = '';
        }
    },

    submitForm: function(e) {
        e.preventDefault();

        _.each(this.model.attributes, function(attr, key) {
            if (key !== 'id' && $('#' + key).length !== 0) {
                this.model.set(key, $('#' + key).val());
            }
        }.bind(this));

        this.trigger('submit');
    }
});

module.exports = ProfileView;
