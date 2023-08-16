var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('express-handlebars');

//var indexRouter = require('./routes/index');
const createacc = require('./routes/createacc')
const importacc = require('./routes/importacc')
const enableacc = require('./routes/enableacc')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/createacc',createacc);
app.use('/importacc',importacc);
app.use('/enableacc',enableacc);
//Sets a basic route
app.get('/', (req, res, next) => {
  res.render('index');
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message + (err.code && ' (' + err.code + ')' || '') +
    //   (req.session.messages && ": " + req.session.messages.join("\n. ") || '');
    res.locals.message = err.message + (err.code && ' (' + err.code + ')' || '');
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  module.exports = app;
  