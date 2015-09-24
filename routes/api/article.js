var express = require('express'),
    isAuthorized = require('../../middleware/isAuthorized'),
    ArticleModel = require('../../models/articlemodel'),
    router = express.Router();

router.post('/article', isAuthorized, function(req, res) {
    ArticleModel.save(req.body, req.user._id, function(err, article) {
        if (err) {
            return res.status(500).json(err);;
        }

        req.status(201).end();
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

router.delete('/article/:id', isAuthorized, function(req, res) {
    var id = req.params.id;
    ArticleModel.get(id, function(err, article) {
        if (err) {
            return res.status(500).json(err);
        }

        article.deleted = true;

        ArticleModel.save(article, req.user._id, function(err, article) {
            if (err) {
                return res.status(500).json(err);
            }

            res.status(200);
        })
    });
});

module.exports = router;