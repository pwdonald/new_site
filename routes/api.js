var express = require('express'),
    router = express.Router(),
    Message = require('../models/messagemodel');

router.post('/message', function(req, res) {
    req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    Message.saveMessage(req.body, function(err, message) {
        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).end();
    });
});

module.exports = router;