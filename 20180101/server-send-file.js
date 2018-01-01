const express = require('express');
const path = require('path');
let server = express();
server.listen(8080);

server.get('/1.txt', (req,res, next)=>{
    console.log(JSON.stringify(req.query));

    if(req.query.pass == '123456') {
        let fileName = path.resolve() + '/1.txt';
        res.sendFile(fileName);
        res.end();
    } else {
        res.sendStatus(404);
        res.end();
    }
});

server.get('/baidu', (req,res,next)=>{
    res.redirect('http://www.baidu.com');
}) 