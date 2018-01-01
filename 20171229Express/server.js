const express = require('express');
const bodyparser = require('body-parser');

let server = express();
server.listen(8080);

//接口
server.get('/', (req,res,next)=>{
    res.send('GET');
});

server.post('/', (req,res)=>{
    res.send('POST')
});

//静态文件
//中间件
server.use(express.static('./www/'));//会自动压缩静态文件
server.use(bodyparser.urlencoded({extended:true}));
server.post('/aaa', (req,res)=>{
    console.log(req.body);
});



