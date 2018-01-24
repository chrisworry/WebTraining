const koa = require('koa');
const convert = require('koa-convert');
const ejs = require('koa-ejs');

let server = new koa();
server.listen(8080);

ejs(server, {
    root:'./views',
    layout:false,
    viewExt: 'ejs',
    cache: false,
    debug: true,
});

server.use(async ctx=>{
    await ctx.render('index', {myLabel:'welcome koa ejs'});
});