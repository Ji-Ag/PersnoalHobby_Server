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
  credentials: true,
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
var favoriteApi = require('./routes/api/favorite');

app.use('/',usersApi);
app.use('/',diaryApi);
app.use('/',hbtiApi);
app.use('/',mainApi);
app.use('/',favoriteApi);

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

app.use(cookieParser());
app.get('/',(req,res)=>{
  res.cookie('cookie2', 'value2', { sameSite: 'none', secure: true });
})

// cookie('key', 'value', option)
// cookie('key2', 'value2', option)

// // 옵션이 없을 경우 세션 쿠키 === 브라우저를 닫으면 사라진다.
// option = {
//   secure: true, // 주소가 "https"로 시작하는 경우에만 쿠키 생성
//   httpOnly: true, // http에서만 쿠키활용 가능. defalt: true
  
//   path: '/', // 경로. 주어진 경로의 하위 디렉토리에 있는 경우에만 쿠키 설정. defalt: '/' 는 전체.
//   domain: ".cookie.com", // 하위 도메인을 제외한 도메인이 일치하는 경우에만 쿠키 설정. defalt: loaded
  
//   maxAge: null, // 60 * 1000 = 60000 = 60초 // 쿠키가 만료되는 시간. 밀리초 단위. 0으로 설정하면 쿠키가 지워진다.
//   expires: null, // 쿠키의 만료 시간을 표준 시간으로 설정
  
//  // signed: , // 쿠키의 서명 여부
  
//   sameSite: "None" // 서로 다른 도메인간의 쿠키 전송에 대한 보안을 설정. defalt: "Lax"
//   // "Strict" : 서로 다른 도메인에서 아예 전송 불가능. 보안성은 높으나 편의가 낮다.
//   // "Lax" : 서로 다른 도메인이지만 일부 예외( HTTP get method / a href / link href )에서는 전송 가능.
//   // "None" : 모든 도메인에서 전송 가능
//   // 좀더 자세히는 https://web.dev/samesite-cookies-explained/
// }

// // 쿠키 생성
// cookie('key', 'value', { path: '/' });
// // 쿠키 삭제 - 생성할 때와 똑같은 path를 사용
// clearCookie('key', { path: '/' });
// app.get('/test',(req,res)=>{
//   console.log(req);
//   res.send({message:"됐나?"});
// })
//module.exports = router;
module.exports = app;
