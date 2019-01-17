var express = require('express');
var path = require('path');
var cors = require('cors');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var logger = require('morgan');
var createError = require('http-errors');

var mongoose = require('mongoose');
var mongooseOptions = { useMongoClient: true };

mongoose.connect('mongodb://mongodb:27017', mongooseOptions, function(err) {
  if(err) {
    console.log("Can't connect to mongodb:server; connecting to local mongo server...")
    mongoose.connect('mongodb://localhost:27017', mongooseOptions); //assuming it's local dev, BAD style 
  }
  console.log("Connected.")
});


require('./models/Patient');
var apiRouter = require('./routes');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: err
  }});
});

var server = app.listen(9000, function () {
  var host = server.address().address
  var port = server.address().port
  
  console.log("P21 server listening at http://%s:%s", host, port)
})

module.exports = app;
