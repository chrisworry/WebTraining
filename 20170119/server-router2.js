const koa = require('koa');
const static = require('koa-static');
const router = require('koa-router');

let server = new koa();

server.listen(8080);

//1 接口
//需要创建一个对象
let mainRouter = router();
server.use(mainRouter.routes());

mainRouter.get('/', async (ctx,next)=>{
    ctx.response.body = 'main';
});

server.use(require('./routers/user'));

//2 静态文件
server.use(static('www'));