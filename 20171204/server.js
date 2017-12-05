const http = require('http');
const fs = require('fs');
const url = require('url');
const mysql = require('mysql');
const path = require('path');
const uuidv4 = require('uuid/v4');

let httpServer = http.createServer((req, res) => {
    const {pathname,query} = url.parse(req.url, true);
    const ext = path.extname(pathname);
    if (ext == '.css' || ext == '.js' || ext == '.html') {
        //static file
        fs.readFile(`www${pathname}`, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.write('not found');
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });

    } else if (pathname == '/reg') {
        //GET interface register
        const {username,password} = query;
        console.log('In register interface.');
        console.log(query);
    } else if (pathname == '/login') {
        //GET interface login
        const {username,password} = query;
        console.log('In login interface.');
        console.log(query);
    } else if (pathname == '/upload') {
        //POST
        let postData;
        req.on('data', (chunk) => {
            postData += chunk;
        });

        req.on('end', () => {
            //write to file
            //注意要去掉 ------WebKitFormBoundary 包住的头尾
            let uid = uuidv4();
            let start = postData.search(/\r\n\r\n/);
            postData = postData.slice(start+4);
            let end = postData.search(/------WebKitFormBoundary/);
            postData = postData.slice(0,end-2);
            fs.writeFile(`www/upload/${uid}.txt`,postData,{encoding:'utf-8'}, err=>{
                if(err) {
                    res.writeHead(500);
                    res.write('write file failed.');
                } else {
                    res.write('server upload success.');
                }
                res.end();
                postData = null;
            });
        });
    } else if (pathname == '/upload_base64') {
        //POST
        let imgData;
        req.on('data', (chunk) => {
            imgData += chunk;
        });

        req.on('end', () => {
            //write to file
            //注意要去掉 ------WebKitFormBoundary 包住的头尾
            let uid = uuidv4();
            let start = imgData.search(/\r\n\r\n/);
            imgData = imgData.slice(start+4);
            let end = imgData.search(/------WebKitFormBoundary/);
            imgData = imgData.slice(0,end-2);

            imgData=imgData.replace(/data:[a-z\-]+(\/[a-z\-]+)?;base64,/i, '');
            fs.writeFile(`www/upload/${uid}.image`,imgData,'base64', err=>{
                if(err) {
                    res.writeHead(500);
                    res.write('write file failed.');
                } else {
                    res.write('server upload success.');
                }
                res.end();
                imgData = null;
            });
        });
    }


});

httpServer.listen(8080);