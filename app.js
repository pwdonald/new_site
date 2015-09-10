var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var NedbStore = require('connect-nedb-session')(session);
var passport = require('passport');
var localSetup = require('./config/local');
var flash = require('express-flash');
var hbs = require('hbs');
var hbsConfig = require('./config/handlebars');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
hbs.registerPartials(__dirname + '/views/partials');
hbsConfig();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(flash());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 't3nt-s3cr3tz',
    name: 't3nt',
    cookie: {
        maxAge: 365 * 24 * 3600 * 1000 // One year for example
    },
    store: new NedbStore({
        filename: 'data/sessions'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
localSetup();

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;