const http = require('http');
const fs = require('fs');
const url = require('url');

let httpServer = http.createServer((req,res)=> {
    let {pathname, query} = url.parse(req.url, true);
    let {username, password} = query;
    //get interface
    if (pathname == '/login') {
        res.write(JSON.stringify({code:0, msg:'login success'}));
        res.end();
    } else if (pathname == '/reg') {

    } else {
        fs.readFile(`www${pathname}`, (err,data)=> {
            if (err) {
                res.write('not found.');
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });
    }

});

httpServer.listen(8080);