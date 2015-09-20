var express = require('express'),
    router = express.Router(),
    isAuthorized = require('../../middleware/isAuthorized'),
    Message = require('../../models/messagemodel');

router.post('/message', function(req, res) {
    req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    req.body.unread = true;
    Message.saveMessage(req.body, function(err, message) {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).end();
    });
});

router.get('/message', isAuthorized, function(req, res) {
    Message.find({}, function(err, messages) {
        if (err) {
            return res.status(500).json(err);
        }

        if (!messages) {
            return res.status(404).end();
        }

        res.status(200).json(messages);
    });
});

router.get('/message/:id', isAuthorized, function(req, res) {
    var id = req.params.id || 0;
    Message.findById(id, function(err, message) {
        if (err) {
            return res.status(500).json(err);
        }

        if (!message) {
            return res.status(404).end();
        }

        res.status(200).json(message);
    });
});

module.exports = router;