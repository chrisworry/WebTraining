const http = require('http');
const url = require('url');
const fs = require('fs');

let httpServer = http.createServer((req,res)=> {
    const {pathname, query} = url.parse(req.url);

    if (pathname == '/upload') {
        req.on('data', data=> {
            
        });
        req.on('end', ()=> {
            
        });
        //upload interface
        console.log('upload');
        console.log(req.files);
    } else {
        //read text
        fs.readFile(`www${pathname}`,(err,data)=>{
            if (err) {
                res.writeHead(404);
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