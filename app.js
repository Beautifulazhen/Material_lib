var express = require('express')
var jade = require('jade')
var mongoose = require('mongoose')

var fs = require('fs')

var path = require('path')
var bodyParser = require('body-parser')

// var session = require('express-session'); //如果要使用session，需要单独包含这个模块
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

var logger = require('morgan')

var app = express()
var port = process.env.PORT||3000
app.locals.moment = require('moment')

mongoose.connect('mongodb://localhost/material')
app.set('views','./app/views/pages')
app.set('view engine','jade')

app.use(express.static(path.join(__dirname,'public/')))
app.locals.resoucePath = "/img";

app.use(bodyParser())

app.use(cookieParser());
app.use(session({
	secret: 'imooc',
	resave: false,
	saveUninitialized: true
}));
require('./config/routes.js')(app)

if("development" === app.get("env")){
	app.set("showStackError",true)
	app.use(logger(":method :url :status"))
	app.locals.pretty = true
	mongoose.set("debug" ,true)
}



console.log('start')

//路由


app.listen(port)