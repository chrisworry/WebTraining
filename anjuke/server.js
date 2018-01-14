const express = require('express');
const config = require('./configure/config');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

let server = express();
server.listen(config.serverPort);

//数据库
let db = mysql.createPool({host:config.host, port:config.port, user:config.user, password:config.password, database:config.database});

server.use((req,res,next)=>{
    req.db = db;
    next();
});

//cookie session
server.use(cookieParser(require('./configure/cookie-key')));
server.use(cookieSession({keys:require('./configure/session-key')}));

//URL post
server.use(bodyParser.urlencoded({extended:false}));

//File post
let multerObj = multer({dest:'./upload'});
server.use(multerObj.any());

//ejs 模板
server.engine('html', consolidate.ejs);
server.set('view engine', 'ejs');
server.set('views', './template');

//router
server.use('/admin', require('./router/admin'));

//static file
server.use(express.static('./www'));
