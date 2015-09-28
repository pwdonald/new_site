var express = require('express'),
    isAuthorized = require('../../middleware/isAuthorized'),
    ArticleModel = require('../../models/articlemodel'),
    router = express.Router();

router.post('/article', isAuthorized, function(req, res) {
    var savingUser = {
        _id: req.user._id,
        username: req.user.username
    };
    ArticleModel.save(req.body, savingUser, function(err, article) {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json(article);
    });
});

router.put('/article/:id', isAuthorized, function(req, res) {
    var id = req.params.id;

    if (req.body.id !== id) {
        return res.status(500).end();
    }

    var savingUser = {
        _id: req.user._id,
        username: req.user.username
    };

    ArticleModel.save(req.body, savingUser, function(err, article) {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(204).json(article);
    });
});

router.get('/article', isAuthorized, function(req, res) {
    ArticleModel.find({}, function(err, articles) {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(articles);
    });
});

router.get('/article/:id', isAuthorized, function(req, res) {
    var id = req.params.id;

    ArticleModel.find({
        _id: id
    }, function(err, articles) {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(articles[0]);
    });
});

router.delete('/article/:id', isAuthorized, function(req, res) {
    var savingUser = {
        _id: req.user._id,
        username: req.user.username
    };
    var id = req.params.id;
    ArticleModel.get(id, function(err, article) {
        if (err) {
            return res.status(500).json(err);
        }

        article.deleted = true;

        ArticleModel.save(article, savingUser, function(err, article) {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(200);
        })
    });
});

module.exports = router;