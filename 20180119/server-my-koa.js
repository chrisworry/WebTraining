const koa = require('./libs/my-koa');

let server = new koa();
server.listen(8000);

server.use((req,res)=>{

});

server.use(function*(req,res){

});

server.use(async (req,res)=>{

});



