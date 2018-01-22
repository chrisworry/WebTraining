const express = require('express');
const consolidate = require('consolidate');

let server = express();
server.listen(8080);

//1 选择一种模板引擎
server.engine('html', consolidate.pug);
//2 指定模板文件的扩展名
server.set('view engine', 'pug');
//3 指定模板文件的路径
server.set('views', './template_pug');

server.get('/', (req,res)=>{
        res.render('1',{a:1, b:2, beauty:true});
        res.end();
    }
);