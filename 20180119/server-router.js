const koa = require('koa');
const static = require('koa-static');
const router = require('koa-router');

let server = new koa();

server.listen(8080);

//1 接口
//需要创建一个对象
let r1 = router();
server.use(r1.routes());

//路由参数
r1.get('/reg/:id/:page', async (ctx,next)=>{
    console.log(ctx.params);//直接在ctx上的params
    ctx.response.body = 'abcd';
});

//2 静态文件
server.use(static('www'));