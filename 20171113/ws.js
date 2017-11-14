const http = require('http');
const io = require('socket.io');

const httpServer = http.createServer();
httpServer.listen(8080);

const wsServer = io.listen(httpServer);
wsServer.on('connection',socket=>{
    socket.on('data',data=>{
        console.log(data);
    });
    //socket.emit();
});