const express = require('./my-express');
const logger = require('./my-logger');
let server = express();

server.listen(8080);

console.log('listen success.');

server.get(logger);
server.get('/', (req,res,next)=>{
    console.log('first in');
    next();
});

server.get('/', (req,res,next)=>{
    //res.send({a:'aaa',b:'bbb'});
    res.send('aaa');
    //res.write('aaa');
    res.end();
});
