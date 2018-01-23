const router = require('koa-router');
let r1 = router();

r1.get('/a', async (ctx, next)=>{
    ctx.response.body = 'aaa';
});

r1.get('/b', async (ctx, next)=>{
    ctx.response.body = 'aaa';
});

r1.get('/reg', async ctx=>{
    const {user, pass} = ctx.request.query;
    console.log(user, pass);
    ctx.response.body = JSON.stringify({err:-1, msg:'test'});
    // ctx.res.statusCode = 200;
    // ctx.res.write({err:-1, msg:'test'});
    // ctx.end();
});

r1.post('/reg', async ctx=>{
    // const {user, pass} = ctx.request.body;
    // console.log(user, pass);

    console.log(ctx.body);
});

module.exports = r1.routes();