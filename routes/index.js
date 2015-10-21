var express = require('express'),
    router = express.Router(),
    User = require('../models/usermodel'),
    Article = require('../models/articlemodel'),
    marked = require('marked'),
    removeMarked = require('remove-markdown');

var alreadyLoggedIn = function(req, res, next) {
    if (req.user && req.isAuthenticated()) {
        res.redirect('/');
    } else {
        next();
    }
};

router.use(function(req, res, next) {
    res.locals.user = req.user;
    res.locals.role = (req.user ? req.user.role : 0);
    res.locals.path = req.path;
    
    Article.getMostRecent(true, function(err, articles) {
        if (err) {
            console.log('Failed to load recent articles for sidebar: ' + err);
            return next();
        }

        if (articles) {
            res.locals.recentArticles = articles;
        }

        next();
    });
});

router.get('/login', alreadyLoggedIn, function(req, res) {
    res.render('login', {
        error: req.flash('error'),
        pageName: 'login',
        pageIcon: 'user'
    });
});

router.get('/logout', function(req, res) {
    req.session.destroy(function() {
        req.logout();
        res.redirect('/');
    });
});

router.get('/register', alreadyLoggedIn, function(req, res) {
    res.render('register', {
        pageName: 'register',
        pageIcon: 'user-plus',
        error: req.flash('error')
    });
});

router.get('/article/search', function(req, res, next) {
    if (!req.query || !req.query.search) {
        return next();
    }

    res.redirect('/article/search/' + req.query.search);
});

router.get('/article/search/:term', function(req, res, next) {
    var term = req.params.term;

    Article.fuzzySearch(term, function(err, articles) {
        if (err) {
            return next(err);
        }

        var count = articles.length;

        if (count > 0) {
            articles.forEach(function(article) {
                article.intro = marked(article.content.substring(0, 400) + '...');
                
                User.findById(article.author._id, function(err, user) {
                    article.author.profile = user.profile;

                    count--;

                    if (count <= 0) {
                        res.render('articleresults', {
                            pageIcon: 'search',
                            pageName: 'results for ' + term,
                            articles: articles,
                            searchTag: term
                        });
                    }
                });
            });
        } else {
            res.render('articleresults', {
                pageIcon: 'search',
                pageName: 'results for ' + term,
                articles: articles,
                searchTag: term
            });
        }

    });
});

router.get('/article/:year/:month/:day/:articleTitle', function(req, res, next) {
    var title = req.params.articleTitle.replace(/-/g, ' '),
        date = req.params.month + '/' + req.params.day + '/' + req.params.year;

    date = new Date(date);

    Article.getByTitleDate(title, date, function(err, articles) {
        if (err) {
            return next(err);
        }

        if (!articles || !articles[0]) {
            return next();
        }

        User.findById(articles[0].author._id, function(err, authorUser) {
            if (err) {
                return next(err);
            }

            if (!authorUser) {
                return next();
            }

            articles[0].author.profile = authorUser.profile;
            articles[0].url = req.protocol + '://' + req.get('host') + req.originalUrl;
            articles[0].content = marked(articles[0].content);

            res.render('article', {
                article: articles[0],
                pageIcon: 'file-text',
                pageName: articles[0].title
            });
        });
    });
});

/* GET home page. */
router.get('/', function(req, res) {
    res.redirect('/blog');
});

router.get('/blog', function(req, res, next) {
    Article.getMostRecent(true, function(err, articles) {
        if (err) {
            return next(err);
        }

        var count = articles.length;

        if (count > 0) {
            articles.forEach(function(article) {
                article.url = req.protocol + '://' + req.get('host') + req.originalUrl;

                User.findById(article.author._id, function(err, user) {
                    article.author.profile = user.profile;

                    count--;

                    if (count <= 0) {
                        res.render('index', {
                            pageName: 'blog',
                            pageIcon: 'rss',
                            articles: articles
                        });
                    }
                });
                article.intro = removeMarked(article.content.substring(0, 400) + '...');
            });
        } else {
            res.render('index', {
                pageName: 'blog',
                pageIcon: 'rss',
                articles: articles
            });
        }
    });
});

router.get('/search/tag/:tag', function(req, res) {
    var tag = req.params.tag;

    Article.searchByTag(tag, function(err, articles) {
        if (err) {
            return next(err);
        }

        res.render('articleresults', {
            pageIcon: 'search',
            pageName: 'results for ' + tag,
            articles: articles,
            searchTag: tag
        });
    });
});

router.get('/projects', function(req, res) {
    res.render('index', {
        pageName: 'projects',
        pageIcon: 'code-fork'
    });
});

router.get('/contact', function(req, res) {
    res.render('contactform', {
        pageName: 'contact',
        pageIcon: 'envelope'
    });
});

router.get('/terms', function(req, res) {
    res.render('termsandconditions', {
        pageName: 'terms and conditions',
        pageIcon: 'gavel'
    });
});

router.get('/privacy', function(req, res) {
    res.render('privacy', {
        pageName: 'privacy',
        pageIcon: 'user-secret'
    });
});

router.get('/profile/:alias', function(req, res, next) {
    var alias = req.params.alias;

    User.find({
        'profile.alias': alias
    }, function(err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            res.status(404);
            return next();
        }

        res.render('author', {
            profile: user.profile,
            pageName: user.profile.alias + '\'s profile',
            pageIcon: 'user'
        });
    });
});

module.exports = router;
