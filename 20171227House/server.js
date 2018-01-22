const http = require('http');
const fs = require('fs');
const url = require('url');
const mysql = require('mysql');
const path = require('path');
const uuidv4 = require('uuid/v4');
const querystring = require('querystring');
const zlib = require('zlib');
let gz = zlib.createGzip();
const router = require('./router');
const users = require('./users');

require('./buffer.js');

let httpServer = http.createServer((req, res) => {
    const {
        pathname,
        query
    } = url.parse(req.url, true);
    const ext = path.extname(pathname);
    
    req.query = query;
    res.send = function(data) {
        if (!(data instanceof Buffer) && (! typeof data != 'String')) {
            data = JSON.stringify(data);
        }
        res.write(data);
    }

    if (req.method == 'GET') {
        //不是接口
        if (false == router.emit(pathname, req, res)) {
            //static file
            //stream & compress gzip
            let rs = fs.createReadStream(`www${pathname}`);
            res.setHeader('Content-Encoding', 'gzip');
            rs.pipe(gz).pipe(res);
            rs.on('error', err => {
                res.writeHead(404);
                res.write('not found');
                res.end();
            });

            // fs.readFile(`www${pathname}`, (err, data) => {
            //     if (err) {
            //         res.writeHead(404);
            //         res.write('not found');
            //         res.end();
            //     } else {
            //         res.write(data);
            //         res.end();
            //     }
            // });
        }
        //是一个接口 
        else {

        }
        // if (ext == '.css' || ext == '.js' || ext == '.html') {

        // } else if (pathname == '/login') {
        //     //GET
        //     console.log(`name:${query.user}, pass:${query.pass}`);
        // }
    } else if (req.method == 'POST') {
        //POST的 req headers的content-type字段：
        //1 "application/x-www-form-urlencoded" 表示POST enctype 是 Url Encode
        //2 'multipart/form-data; boundary=----WebKitFormBoundar随机的字符' 表示POST enctype 是 Form Data
        //2.1 boundary是用来分割Form Data各个数据段的分隔符

        //Form Data
        if (req.headers['content-type'].startsWith('multipart/form-data;')) {
            console.log('Recv Post Form Data.');
            // console.log(req.headers['content-type']);

            //1 获得formdata 分隔符(注意header中少了两个--)
            let boundary = '--' + req.headers['content-type'].split('; ')[1].split('=')[1];
            console.log(boundary);

            let aBuffer = [];
            req.on('data', data => {
                aBuffer.push(data);
            });

            req.on('end', () => {
                let data = Buffer.concat(aBuffer);
                //对二进制进行分割获取
                let post = [];
                let contents = data.splice(boundary);
                contents.pop();
                contents.forEach(ele => {
                    let q = ele.splice('\r\n');
                    let cd = q[0];
                    //console.log(cd.toString());
                    let namestr = cd.splice('; ')[1];
                    //console.log(namestr.toString());
                    let name = namestr.splice('=')[1];
                    name = name.slice(1, name.length - 1);
                    //console.log(name.toString());

                    if (q.length == 2) {
                        //value
                        let val = q[1].toString();
                        //console.log(val);
                        post.push({
                            name: name.toString(),
                            value: val.toString()
                        });
                    } else if (q.length == 3) {
                        //file
                        //file name 
                        let fileNameStr = cd.splice('; ')[2];
                        let fileName = fileNameStr.splice('=')[1];
                        fileName = fileName.slice(1, fileName.length - 1);
                        //ext
                        let extStr = q[1].splice(': ')[1].splice('/')[1];
                        //console.log('file');
                        //console.log(extStr.toString());
                        //content
                        let uid = uuidv4();
                        let filename = `./upload/${uid}.${extStr}`;
                        //console.log(filename);
                        post.push({
                            name: name.toString(),
                            file: fileName.toString()
                        });

                        fs.writeFile(filename, q[2], function (err) {
                            if (err) {
                                console.log('write failed.');
                            } else {
                                console.log('write success.');
                            }
                        })
                    }
                });

                let postStr = '';
                post.forEach(ele => {
                    postStr += JSON.stringify(ele);
                })

                console.log(postStr);



                // let str = data.toString();
                // let post = querystring.parse(str);
                res.write(postStr);
                res.end();
            });
        }
        //Url Encode
        else {
            console.log('Recv Post URL Encode.');

            let aBuffer = [];
            req.on('data', data => {
                aBuffer.push(data);
            });

            req.on('end', () => {
                let data = Buffer.concat(aBuffer);
                let str = data.toString();
                let post = querystring.parse(str);
                res.write(str);
                res.end();
            });
        }
    }
});

httpServer.listen(8080);

/*
Form Data的二进制格式如下
------WebKitFormBoundaryVeOJUYzzpzRTtgJj(\r\n)
Content-Disposition: form-data; name="user"(\r\n)
(\r\n)
(\r\n)
123(\r\n)
------WebKitFormBoundaryVeOJUYzzpzRTtgJj(\r\n)
Content-Disposition: form-data; name="pass"(\r\n)
(\r\n)
(\r\n)
111(\r\n)
------WebKitFormBoundaryVeOJUYzzpzRTtgJj(\r\n)
Content-Disposition: form-data; name="file1"; filename="padding.PNG"(\r\n)
Content-Type: image/png(\r\n)
(\r\n)
(\r\n)
数据部分(\r\n)
------WebKitFormBoundaryVeOJUYzzpzRTtgJj--(\r\n)
*/