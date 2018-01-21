const koa = require('koa');
const static = require('koa-static');
const route = require('koa-route');

let server = new koa();

server.listen(8080);

//1 接口

// GET
// /reg?user=xxx&pass=xxx
server.use(route.get('/reg', async (ctx, next)=>{
    //ctx 上下文，req,res,request,response
    
    //GET 是在request的query
    console.log(ctx.request.query);
    
    //返回内容
    ctx.response.body = 'abc';
}));




// 路由参数
// /login/user/pass
server.use(route.get('/login/:user/:pass', async (ctx, user, pass, next)=>{
    //ctx 上下文，req,res,request,response
    
    //路由参数
    console.log(user);
    console.log(pass);

    
    //返回内容
    ctx.response.body = 'abc';
}));

//2 静态文件
server.use(static('www'));