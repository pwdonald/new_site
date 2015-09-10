var hbs = require('express-hbs');

module.exports = function() {
    hbs.registerHelper('getActiveNav', function(link, querystring) {
        if (link === querystring) {
            return 'active';
        }

        return '';
    });
};