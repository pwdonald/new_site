var express = require('express'),
    isAuthorized = require('../../middleware/isAuthorized'),
    SettingsModel = require('../../models/settingsmodel'),
    router = express.Router();

router.put('/settings/:id', isAuthorized, function(req, res, next) {
    SettingsModel.save(req.body, function(err, savedSettings) {
        if (err) {
            return next(err);
        }

        res.status(204).json(savedSettings);
    });
});


router.post('/settings', isAuthorized, function(req, res, next) {
    SettingsModel.save(req.body, function(err, savedSettings) {
        if (err) {
            return next(err);
        }

        res.status(201).json(savedSettings);
    });
});


router.get('/settings', isAuthorized, function(req, res, next) {
    SettingsModel.load(function(err, settings) {
        if (err) {
            return next(err);
        }

        res.status(200).json(settings);
    });
});

module.exports = router;
