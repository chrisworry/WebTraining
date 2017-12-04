const http = require('http');
const url = require('url');
const fs = require('fs');
const uuid = require('node-uuid');

let uploadBuffer = [];
let httpServer = http.createServer((req,res)=> {
    const {pathname, query} = url.parse(req.url);
    if (pathname == '/upload') {
        req.on('data', data=> {
            console.log(data);
            uploadBuffer.push(data);
        });
        req.on('end', ()=> {
            let uploadSize = 0;
            uploadBuffer.forEach(buf =>{
                uploadSize += buf.length;
            });
            let bufSum = new Buffer(uploadSize);
            let i = 0;
            uploadBuffer.forEach(buf =>{
              for(let j=0;j<buf.length;++j) {
                  bufSum[i + j] = buf[j];
                  ++i;
              }  
            });
            uploadBuffer = [];

            console.log(uploadSize);
            console.log(bufSum.length);
            console.log(i);
            let v4 = uuid.v4();
            fs.writeFile(`upload/${v4}`,bufSum, (err)=>{
                if (err) {
                    console.log(`write failed: ${err}`);
                } else {
                    console.log('write success.');
                }
            });
        });
        //upload interface
        //console.log('upload');
        // /console.log(req.files);
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