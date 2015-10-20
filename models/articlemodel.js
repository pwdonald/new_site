var Datastore = require('nedb'),
    _ = require('underscore');

var Article = new Datastore({
    filename: 'data/article',
    autoload: true
});

var defaultQuery = {
    deleted: false,
    published: true
};

var requiredFields = [
    'title',
    'publishDate',
    'tags',
    'content',
    'published'
];

var validate = function(articleData) {
    var errors = [];
    var article = articleData;

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

var retrieveWithinDates = function(start, end, exclusionId, maxResults) {
    var startDate = new Date(start),
        endDate = new Date(end),
        maximumResults = maxResults || 5;

    return Article.find({
        publishDate: {
            $gte: startDate,
            $lte: endDate
        },
        published: true,
        deleted: false,
        _id: {
            $nin: [exclusionId]
        }
    }).sort({
        publishDate: -1
    }).limit(maximumResults);
};

var retrieveMostRecent = function(arePublished, recentCount) {
    var count = recentCount || 5;
    if (arePublished) {
        return Article.find({
            deleted: false,
            published: arePublished
        }).sort({
            publishDate: -1
        }).limit(count);
    }

    return Article.find({
        deleted: false
    }).sort({
        publishDate: -1,
        createDate: -1,
        modifiedDate: -1
    }).limit(count);
};

var findPreviousArticle = function(article, callback) {
    if (!article) {
        return callback('No article specified!');
    }

    retrieveWithinDates('01/01/2000', article.publishDate, article._id, 1).exec(function(err, articles) {
        if (err) {
            callback(err);
        }

        callback(null, articles[0]);
    });
};

var findNextArticle = function(article, callback) {
    if (!article) {
        return callback('No article specified!');
    }

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    retrieveWithinDates(article.publishDate, tomorrow.toLocaleDateString(), article._id, 1).exec(function(err, articles) {
        if (err) {
            callback(err);
        }

        callback(undefined, articles[0]);
    });
};

exports.getMostRecent = function(arePublished, callback, recentCount) {
    var articleFetch = retrieveMostRecent(arePublished, recentCount);

    articleFetch.exec(callback);
};

exports.getByTitleDate = function(title, date, callback) {
    var titleRegex = new RegExp('^' + title + '$', 'i');

    Article.find({
        "title": {
            $regex: titleRegex
        },
        publishDate: date
    }, function(err, articles) {
        if (err) {
            return callback(err);
        }

        if (!articles || !articles[0]) {
            return callback(undefined, []);
        }

        var count = articles.length;

        articles.forEach(function(article) {
            findPreviousArticle(article, function(err, previousArticle) {
                if (err) {
                    console.log('failed to find previous article');
                }

                if (previousArticle) {
                    if (article._id !== previousArticle._id) {
                        article.prevArticle = previousArticle;
                    }
                }

                findNextArticle(article, function(err, nextArticle) {
                    if (err) {
                        console.log('failed to find next article');
                    }

                    if (nextArticle) {
                        if (article._id !== nextArticle._id) {
                            article.nextArticle = nextArticle;
                        }
                    }

                    count--;

                    if (count <= 0) {
                        callback(undefined, articles);
                    }
                });
            });
        });
    });
};

exports.searchByTag = function(tag, callback) {
    var query = _.clone(defaultQuery);
    query.tags = {
        $regex: new RegExp(tag, 'gi')
    };

    Article.find(query, function(err, articles) {
        if (err) {
            return callback(err);
        }

        callback(null, articles);
    });
};

exports.fuzzySearch = function(searchTerm, callback) {
    var query = {
        $or: [{
            tags: {
                $regex: new RegExp(searchTerm, 'gi')
            }
        }, {
            title: {
                $regex: new RegExp(searchTerm, 'gi')
            }
        }, {
            content: {
                $regex: new RegExp(searchTerm, 'gi')
            }
        }]
    };

    _.extend(query, defaultQuery);

    Article.find(query, function(err, articles) {
        if (err) {
            return callback(err);
        }

        _.uniq(articles);

        callback(null, articles);
    });
};

exports.find = function(query, callback) {
    _.extend(query, defaultQuery);
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

    articleData.tags = articleData.tags.split(',');

    for (var i = 0; i < articleData.tags.length; i++) {
        articleData.tags[i] = articleData.tags[i].trim();
    }

    if (validationErrors && validationErrors.length > 0) {
        return callback(validationErrors);
    }

    if (articleData.published) {
        if (articleData.published === 'true') {
            articleData.published = true;
            articleData.publishDate = new Date(articleData.publishDate);
        } else {
            articleData.published = false;
        }
    } else {
        articleData.published = false;
    }

    articleData._id = articleData.id;

    delete articleData.id;

    var titleRegex = new RegExp('^' + articleData.title + '?.$', 'i');

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
        articleData.createDate = new Date();
        articleData.author = user;
        articleData.modifiedDate = new Date();
        articleData.revision = 0;
        articleData.deleted = false;

        Article.insert(articleData, callback);
    }
};
