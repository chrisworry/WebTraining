const http = require('http');
const fs = require('fs');
const url = require('url');

let httpServer = http.createServer((req,res)=> {
    let aUrl = url.parse(req.url, true);
    let pathname = aUrl.pathname;
    let {username,password} = aUrl.query;
    fs.readFile(`www${pathname}`,(err,data) => {
        if (err) {
            res.writeHeader(404);
            res.write('not found');
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });

});

httpServer.listen(8080);