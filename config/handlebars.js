var hbs = require('express-hbs');

module.exports = function() {
    hbs.registerHelper('getActiveNav', function(link, querystring) {
        if (link === querystring) {
            return 'active';
        }

        return '';
    });

    hbs.registerHelper('date', function(options) {
        var date = new Date(options);
        var now = new Date();

        if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
            return 'Today';
        }
        return date.toLocaleDateString();
    });

    hbs.registerHelper('formatTitle', function(options) {
        if (options && options.replace) {
            options = options.replace(' ', '-');
        }

        return options;
    });
};
