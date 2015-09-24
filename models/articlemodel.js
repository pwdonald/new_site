var Datastore = require('nedb'),
    _ = require('underscore');

var Article = new Datastore({
    filename: 'data/article',
    autoload: true
});

var requiredFields = [
    'title',
    'publishDate',
    'tags',
    'content',
    'published'
];

var validate = function(articleData) {
    var errors = [];
    var article = articleData.article;

    if (article && article.published) {
        _.each(requiredFields, function(field) {
            if (!article[field] || article[field] === '' || (article[field].trim && article[field].trim() === '')) {
                errors.push({
                    name: field,
                    message: field + ' is required!'
                });
            }
        });
    }

    return errors;
};

exports.find = function(query, callback) {
    query.deleted = false;
    Article.find(query, callback);
};

exports.get = function(id, callback) {
    Article.findOne({
        _id: id,
        deleted: false
    }, callback);
};

exports.hardDelete = function(id, callback) {
    Article.remove({
        _id: id
    }, false, callback);
};

exports.save = function(articleData, user, callback) {
    var validationErrors = validate(articleData);

    if (validationErrors && validationErrors.length > 0) {
        return callback(validationErrors);
    }

    if (articleData._id) {
        // update model

        articleData.modifiedDate = new Date();
        articleData.lastModifiedBy = user;
        articleData.revision++;

        Article.update({
            _id: articleData._id
        }, articleData, function(err) {
            callback(err, articleData);
        });

    } else {
        // save new model

        Article.insert({
            article: articleData.article,
            createDate: new Date(),
            author: user,
            modifiedDate: new Date(),
            revision: 0,
            deleted: false
        }, callback);

    }
};