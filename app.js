var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var config = require("./config/config");//加载全局配置
//引入session和cookie
var cookieParser = require('cookie-parser')
var session = require('express-session')

var utils = require("./utils/uuid");

var routes = require('./controller/indexController');
var users = require('./controller/usersController');
var login = require('./controller/loginController');
var ejs = require("ejs");
var multer = require ( 'multer' )
var app = express();
var dateUtils = require("./utils/date");
app.locals.dateUtils = dateUtils;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
/*app.set('view engine', 'ejs');*/

//设置html 模板
app.engine("html", ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    cookie: { maxAge: 60 * 1000*1000 },
    secret: utils.getUUID(),
    resave: false,
    saveUninitialized: false
}));
//定义中间件  实现登录过滤
/*app.use(function (req, res, next) {
    var url = req.originalUrl;
    //console.log("session的值:" + req.session.user);
  if (url != "/login/login" && !req.session.user&&!req.xhr) {
        return res.redirect("/login/login");
    }
    next();
});*/
/*
app.use(multer({ dest: './upload/' }).any())*/


app.use('/', routes);
app.use('/users', users);
app.use('/login', login);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
