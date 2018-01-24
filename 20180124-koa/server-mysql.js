const koa = require('koa');
//const mysql = require('koa-mysql');
const mysql = require('./libs/koa-better-mysql');
const convert = require('koa-convert');

const  db = mysql.createPool({host:'localhost', user:'root',password:'123456', port:3306,database:'anjuke'});

let server = new koa();
server.listen(8080);

// server.use(async ctx=>{
//     let p = new Promise((resolve,reject)=>{
//         let fn = db.query('SELECT * FROM house_table');
//         fn((err,data)=>{
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });

//     let data = await p;
//     console.log(data);
//     ctx.response.body = data;
// });

server.use(async ctx=>{
    let data = await db.query('SELECT * FROM house_table');
    console.log(data);
    ctx.response.body = data;
});