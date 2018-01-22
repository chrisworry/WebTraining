const router = require('koa-router');
let r1 = router();

r1.get('/a', async (ctx, next)=>{
    ctx.response.body = 'aaa';
});

r1.get('/b', async (ctx, next)=>{
    ctx.response.body = 'aaa';
});

module.exports = r1.routes();