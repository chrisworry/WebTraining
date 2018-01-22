const express = require('express');
const bodyparser = require('body-parser');
const logger = require('./my-logger');

let server = express();
server.listen(8080);

//静态文件
//中间件
server.use(logger);
server.use(express.static('./www/'));//会自动压缩静态文件
server.use(bodyparser.urlencoded({extended:false}));

//接口
server.get('/', (req,res,next)=>{
    res.send('GET');
});

server.post('/', (req,res)=>{
    res.send('POST')
});

server.post('/aaa', (req,res)=>{
    console.log(req.body);
});



