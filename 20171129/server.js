const net = require('net');
const crypto = require('crypto');
//1 创建 tcp server
let server = net.createServer(socket=>{
    console.log('connect');

    //3 连接浏览器发过来的特殊头，处理，返回处理结果 
    socket.once('data',(data)=>{
        //接受第一次的握手数据

        //1 获取头信息
        let httpHeader = data.toString();
        let aHeaders = httpHeader.split('\r\n')
        aHeaders.shift();
        aHeaders.pop();
        aHeaders.pop();

        let headers = {};
        aHeaders.forEach(str=>{
            let [name,value] = str.split(': ');
            headers[name] = value;
        });
        console.log(headers);

        //第二步 检验
        if (headers['Connection'] != 'Upgrade' && headers['Upgrade'] != 'websocket') {
            console.log('not websocket');
            socket.end();
        } else{ 
            //第三部 处理websocket专用头（主要是key，version也可以检验下）
            // 258EAFA5-E914-47DA-95CA-C5AB0DC85B11
            // 然后做一次SHA-1 散列
            //再BASE64

            if (headers['Sec-WebSocket-Version'] != '13') {
                console.log('just process websocket version 13.');
                socket.end();
            } else {
                //检验key,需要把key加上websocket GUID
                let key = headers['Sec-WebSocket-Key'];
                let hash = crypto.createHash('sha1');
                hash.update(key+'258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
                let keyRet = hash.digest('base64');
                //发送HTTP头回去（带处理过的key）
                socket.write(`HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${keyRet}\r\n\r\n`);
        
            }
        }

        socket.on('data', (data)=> {
            console.log('<><><>data in<><><>');
            console.log(data);
        });

        




    });

    socket.on('end',()=>{
        console.log('disconnect');
    });

});
server.listen(8080);
