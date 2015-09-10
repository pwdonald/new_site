var hbs = require('hbs');

module.exports = function() {
    hbs.registerHelper('getActiveNav', function(link, querystring) {
        if (link === querystring) {
            return 'active';
        }

        return '';
    });
};