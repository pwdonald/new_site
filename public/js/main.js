var $ = window.jQuery = window.$ = require('jquery');
var bootstrap = window.bootstrap = require('bootstrap');

var notifications;

$(document).ready(function() {
    notifications = $('#notifications');

    notifications.hide();
});

var submitContactMessage = function() {

};

window.displayNotification = function(message, alertType) {
    notifications.removeClass('hidden');
    notifications.children('#response')
        .addClass(alertType)
        .html(message);
    notifications.show().fadeIn(500);
};

window.hideNotifications = function() {
    notifications.children('#response')
        .attr('class', 'alert');

    notifications.hide().fadeOut(500);
};