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
    }

});

httpServer.listen(8080);