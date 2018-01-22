const express = require('express');
const fs = require('fs');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const mysql = require('mysql');

const config = require('./config/config');
const common = require('./libs/common');

let server = express();
server.listen(config.serverPort);

//数据库
const dbPara = require('./config/db');
const db = mysql.createPool({host:dbPara.host, port:dbPara.port, user:dbPara.user, password: dbPara.password, database:dbPara.database});

//set db to req
server.use((res,req,next)=>{
    req.db = db;
    next();
});

//中间件
//url-encoded POST
server.use(bodyParser.urlencoded({extended:false}));

//file POST (multer)
let upload = multer({dest:'./upload'});
server.use(upload.any());

//cookie & session
server.use(cookieParser(require('./secret/cookie_keys')));
server.use(cookieSession({keys:require('./secret/session_keys')}));

//服务器渲染
server.set('html', consolidate.ejs);
server.set('view engine', '.ejs');
server.set('views', './template');

server.use('/', require('./router/www'));
server.use('/admin', require('./router/admin'));

//静态文件
server.use(express.static('./www'));

