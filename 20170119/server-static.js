const koa = require('koa');
const static = require('koa-static');
const router = require('koa-router');
const fs = require('fs');

let server = new koa();

server.listen(8080);



/// 静态文件
// 缓存
// 压缩
// 读取文件
//server.use(static('www'));

server.use(require('./libs/my-static')('www'));