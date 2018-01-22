const express = require('express');
const bodyParse = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
const mysql = require('mysql');
const config = require('./config');
const router = require('router');

let server = express();
server.listen(config.port);

mysql.createPool({host:config.mysql_host, user:config.mysql_user, password: config.mysql_password, database: config.mysql_dbname});

//----------------------------------------//
//中间件
//普通POST
server.use(bodyParse.urlencoded({extended: false}));

//文件上传
//注意：大型项目不能在单一目录存东西，可以通过散列等方法
let multerObj = multer({dest:'./upload'});
server.use(multerObj.any());

//cookie session
server.use(cookieParser(require('./secret/cookie_key')));
server.use(cookieSession(require('./secret/session_key')));

//模板
server.set('html', consolidate.ejs);
server.set('view engine', '.ejs');
server.set('views', './template');

//处理请求
//网站
server.use('/', require('./routers/www'));
//管理员
server.use('/admin/', require('./routers/admin'));

//静态文件
server.use(express.static('./www/'));





