const http = require('http');
const io = require('socket.io');
const fs = require('fs');
const mysql = require('mysql');
const url = require('url');

let db = mysql.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    database:'20171113',    
});

let httpServer = http.createServer((req,res)=>{
    let {pathname,query} = url.parse(req.url,true);//js解构语法
    if(pathname == '/login') {
        //login interface: /login?user=xxx&pass=xxx
        let {user,name} = query;

        console.log(query);
    } else if (pathname == '/reg') {
        //login interface: /reg?user=xxx&pass=xxx
        let {user,password} = query;
        //1 先校验数据（规则）很重要（前台(体验，js禁掉全玩完) 后台（尤其重要）都要校验） 正则
        if(!/^\w{2,32}$/.test(user)) {
            res.write(JSON.stringify({code:1,msg:'用户名不符合规范'}));
            res.end();
        } else if(!/^.{6,32}$/.test(password)) {
            res.write(JSON.stringify({code:1,msg:'密码不符合规范'}));
            res.end();
        } else {
            db.query(`select * from user_table where username='${user}'` ,(err,data)=>{
                if(err) {
                    res.write(JSON.stringify({code:1,msg:'数据库错误'}));
                    res.end();
                } else if(data.length > 0) {
                    res.write(JSON.stringify({code:1,msg:'用户名已存在'}));
                    res.end();
                } else {
                    db.query(`insert into user_table (username,password,online) values ('${user}','${password}',0)` ,(err,data)=>{
                        if(err) {
                            res.write(JSON.stringify({code:1,msg:'数据库错误'}));
                            res.end();
                        } else {
                            res.write(JSON.stringify({code:0,msg:'注册成功'}));
                            res.end();
                            console.log('注册成功');
                        }
                })};
            });
        }
        
        //2 用户名重复
        //3 插入数据库
        console.log(query);
    } else {
        fs.readFile(`www${req.url}`, (err,data)=>{
            if(err) {
                res.writeHead(404);
                res.write('not found');
                console.log(err);
            } else {
                res.write(data);
            }
            res.end();
        });
    }
    
});

httpServer.listen(8080);
let wdServer = io.listen(httpServer);