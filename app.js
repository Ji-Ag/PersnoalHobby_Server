var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(cors({
  origin:"http://localhost:3000",
  methods: ["GET","POST"],
}
));

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var usersApi = require('./routes/api/users');
var diaryApi = require("./routes/api/diary");
var hbtiApi = require('./routes/api/hbti');
var mainApi = require('./routes/api/main');

app.use('/',usersApi);
app.use('/',diaryApi);
app.use('/',hbtiApi);
app.use('/',mainApi);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

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
  res.render('error');
});

// app.get('/test',(req,res)=>{
//   console.log(req);
//   res.send({message:"됐나?"});
// })
//module.exports = router;
module.exports = app;
