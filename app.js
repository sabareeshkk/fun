var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var expressSession = require('express-session');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var multer  = require('multer');
var upload = multer({ dest: 'public/' });
var type = upload.single('file');
var fs = require('fs');
var _ = require('lodash');
var project = require('./models/project');

mongoose.connect('mongodb://localhost/fun', {
      db: {
        safe: true
      }
    });
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'client'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// simple middle ware
var myLogger = function (req, res, next) {
  console.log('middle ware ');
  next();
};

app.use(myLogger);


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({secret: 'mySecretKey'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'client')));
app.use('/uploads', require('express').static('uploads'));
app.set('appPath', path.join(__dirname, 'client'));

app.use('/users', require('./routes/users'));
app.use('/project', require('./routes/project.route'));

app.post('/profile/:id', type, function (req,res, next) {
  console.log(req.params);
  /*console.log(req.params);*/

  /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
  var tmp_path = req.file.path;
  console.log('tmp_path', req.file.path);
  console.log('target_path' , req.file.originalname);
  /** The original name of the uploaded file
      stored in the variable "originalname". **/
  var target_path = 'uploads/' + req.file.originalname;
  /*console.log('target_path', target_path);
  console.log('real_path', typeof path.join(config.root, target_path))*/
  project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    var updated = _.merge(project, {avatar: target_path});
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      /*return res.status(200).json(project);*/
    });
  });
  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() { console.log('successfully uploaded');
      res.render('index');
  });
  src.on('error', function(err) { res.render('error'); });

});

app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
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
