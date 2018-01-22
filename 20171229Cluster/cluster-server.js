const http = require('http');
const url = require('url');
const fs = require('fs');
const os = require('os');
const cluster = require('cluster');
const process = require('process');

if (cluster.isMaster) {
    for (let index = 0; index < os.cpus().length; index++) {
        cluster.fork();
    }
} else {
    http.createServer((req,res)=>{
        console.log(`Process ID: ${process.pid}`);
        
        const {pathname,query} = url.parse(req.url, true);
        
        let rs = fs.createReadStream(`www${pathname}`);
        rs.pipe(res);

        rs.on('error', err=>{
            res.writeHead(404);
            res.write('not found');
            res.end();    
        });

    }).listen(8080);
}

