var express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    NedbStore = require('connect-nedb-session')(session),
    passport = require('passport'),
    localSetup = require('./config/local'),
    flash = require('express-flash'),
    hbs = require('express-hbs'),
    hbsConfig = require('./config/handlebars');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.engine('html', hbs.express4({
    partialsDir: __dirname + '/views/partials',
    defaultLayout: __dirname + '/views/layout.html'
}));
app.set('view engine', 'html');
hbsConfig();
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('t3nt-s3cr3tz'));
app.use(session({
    secret: 't3nt-s3cr3tz',
    name: 't3nt',
    cookie: {
        maxAge: 365 * 24 * 3600 * 1000 // One year for example
    },
    store: new NedbStore({
        filename: 'data/sessions'
    }),
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(passport.initialize());
app.use(passport.session());
localSetup();

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);
app.use('/admin', admin);

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