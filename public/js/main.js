var $ = window.jQuery = window.$ = require('jquery');
var bootstrap = window.bootstrap = require('bootstrap');

var notifications;
var addedClass;

$(document).ready(function() {
    notifications = $('#notifications');

    notifications.hide();
});

window.displayNotification = function(message, alertType) {
    addedClass = alertType;

    notifications.removeClass('hidden');
    notifications.children('#response')
        .addClass(addedClass)
        .html(message);
    var fade = notifications.fadeIn(500);

    $.when(fade).done(function() {
        setTimeout(window.hideNotifications, 3000);
    });
};

window.hideNotifications = function() {
    var fade = notifications.fadeOut(500);

    $.when(fade).done(function() {
        notifications.children('#response')
            .removeClass(addedClass);
    });
};