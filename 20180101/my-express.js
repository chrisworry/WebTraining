const http = require('http');
const assert = require('assert');
const url = require('url');

module.exports = function() {
    
    let queue = [];
    let server = http.createServer((req,res)=>{
        const {pathname , query} = url.parse(req.url, true);
        req.query = query;
        res.send = function(data) {
            //buffer
            if (data instanceof Buffer || typeof data == 'string' ) {
                res.write(data);
            } else {
                res.write(JSON.stringify(data));
            }
            //string
            //array
            //json
        }
        
        //核心在这里，寻找注册的path函数
        function __runPathQueue(n) {
            for (let i = n; i<queue.length; ++i) {
                if (queue[i].path == pathname || queue[i].path == '*') {
                    queue[i].fn(req, res, ()=>{
                        __runPathQueue(i+1);
                    }); 
                    break;
                }
                
            }
        }

        __runPathQueue(0);
    });

    server.get = function() {
        assert(arguments.length == 2 || arguments.length == 1, 'argument error');

        if (arguments.length == 2) {
            let [path , fn ] = arguments;

            queue.push({path,fn});
            //console.log(path, fn);
        } else if (arguments.length == 1) {
            let [fn] = arguments;
            let path = '*';

            queue.push({path,fn});
            //console.log(path, fn);
        }

        
    };

    return server;
};