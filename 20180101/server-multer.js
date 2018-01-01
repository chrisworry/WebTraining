const express = require('express');
const multer = require('multer');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path');

let server = express();
server.listen(8080);

server.use(express.static('./www/'));//会自动压缩静态文件
//server.use(bodyparser.urlencoded({extended:false}));

//这里配置multer，直接会将post的file存在dest下
let multerObj = multer({dest:'./upload/'});

server.use(multerObj.any());

server.post('/upload', (req,res,next)=>{
    let i = 0; 

    //这里重命名文件，并将所有文件上传完成后发送成功消息给客户端
    function __next() {
        console.log(i);
        console.log(req.files[i].path);
        let newName = req.files[i].path + path.extname(req.files[i].originalname);

        fs.rename(req.files[i].path, newName, (err)=>{
            if (err) {
                console.log(err);
                res.sendStatus(500,'rename error');
            } else {
                ++i;
                if (i >= req.files.length) {
                    res.send('upload OK');
                    res.end();
                } else {
                    __next();
                }
            }
        });
    }

    __next();

});