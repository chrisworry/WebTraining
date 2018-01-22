const express = require('express');
const consolidate = require('consolidate');
const fs = require('fs');
const ejs = require('ejs');

let server = express();
server.listen(8080);

//1 选择一种模板引擎
server.engine('html', consolidate.ejs);
//2 指定模板文件的扩展名
server.set('view engine', 'ejs');
//3 指定模板文件的路径
server.set('views', './template');

server.get('/', (req,res)=>{
    fs.stat('./render_cache/1', err=>{
        if (err) {
            renderAndWrite();
        } else {
            let rs = fs.createReadStream('./render_cache/1');
            rs.pipe(res);
            rs.on('error', err=>{
                renderAndWrite();
            });
        }
    });

    function renderAndWrite() {
        ejs.renderFile('./template/1.ejs',{arr:[1,2,3,4,45,5]}, (err, data)=>{
            res.send(data);
            res.end();

            fs.writeFile('./render_cache/1', data, err=>{

            });
        });

        //res.render('1',{arr:[1,2,3,4,45,5]});
        //res.end();
    }

});