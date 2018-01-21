const koa = require('koa');
const static = require('koa-static');
const router = require('koa-router');

let server = new koa();

server.listen(8080);

//统计页面处理时间
server.use(async(ctx,next)=>{
    let start = new Date().getTime();

    await next();

    let end = new Date().getTime();

    console.log(end -start);
});

//统一处理404
// server.use(async(ctx,next)=>{
//     try{
//         await next();
//     }catch(e) {
//         //通过e的name来判断错误类型404 500 等
//         ctx.response.body = '404';
//     }
// });

//2 静态文件
server.use(static('www'));