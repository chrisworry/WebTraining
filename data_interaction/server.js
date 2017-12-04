const http = require('http');
const fs = require('fs');
const url = require('url');
const mysql = require('mysql');
const path = require('path');
const uuidv4 = require('uuid/v4');

let httpServer = http.createServer((req, res) => {
    const {pathname,query} = url.parse(req.url, true);
    let postData;
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
        const {
            username,
            password
        } = query;
        console.log('In register interface.');
        console.log(query);
    } else if (pathname == '/login') {
        //GET interface login
        const {
            username,
            password
        } = query;
        console.log('In login interface.');
        console.log(query);
    } else if (pathname == '/upload') {
        //POST
        req.on('data', (chunk) => {
            postData += chunk;
        });

        req.on('end', () => {
            //write to file
            let uid = uuidv4();
            //postData = querystring.parse(postData);
            //console.log(postData);
            let a = postData.search(/\n\n/);
            fs.writeFileSync(`www/${uid}`,postData.slice(0),{encoding:'utf-8'});
            postData = null;
        });
    }


});

httpServer.listen(8080);