const express = require('express');
const fs = require('fs');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const config = require('./config/config')

let server = express();
server.listen(config.serverPort);

//数据库


//中间件
//url-encoded POST
server.use(bodyParser.urlencoded({extended:false}));

//服务器渲染
server.set('html', consolidate.ejs);
server.set('view engine', '.ejs');
server.set('views', './template');

server.use('/', require('./router/www'));
server.use('/admin', require('./router/admin'));

//静态文件
server.use(express.static('./www'));

