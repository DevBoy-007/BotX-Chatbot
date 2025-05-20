//======================Application Modules======================
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');
const connectDB=require('./connection')
const Ai=require('./Api/Ai');
const conid=require('./routes/conid');
const promptroutes=require('./routes/users');
const history=require('./routes/history')
const messages=require('./routes/message')
const sign=require('./routes/sign')
const login=require('./routes/login');
var app = express();
//===========================Middlewares===========================
app.set('view engine', 'jade');
app.use(cors({
  origin: "http://localhost:5173", // your frontend domain
  credentials: true
}));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//=============================Routes===============================
app.use('/api', Ai); // Use the Ai router for API requests
app.use('/prompt',promptroutes)
app.use('/conversation_id',conid)
app.use('/chats',history)  // all chat history
app.use('/currentchat',messages);
app.use('/removechat',history);
app.use('/usersign',sign);
app.use('/userlogin',login);
//============================DBConnection==========================
connectDB();
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

module.exports = app;
