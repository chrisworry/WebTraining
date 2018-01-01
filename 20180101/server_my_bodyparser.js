const express = require('express');
const bodyparser = require('body-parser');
const querystring = require('querystring');
let server = express();
server.listen(8080);

//静态文件
//中间件
server.use(express.static('./www/'));//会自动压缩静态文件

server.use((req,res,next)=>{
    let str = '';
    req.on('data', data=> {
        str += data;
    })
    req.on('end', ()=>{
        query = querystring.parse(str);
        str = '';
        req.body = query;
        next();
    })
});

//接口
server.get('/', (req,res,next)=>{
    res.send('GET');
});

server.post('/', (req,res)=>{
    res.send(req.body);
});



