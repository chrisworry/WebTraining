const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const url = require('url');

let db = mysql.createPool({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123456',
    database:'20171113'
});

let httpServer = http.createServer((req,res)=> {
    let {pathname,query} = url.parse(req.url, true);
    let {username,password} = query;
    if (pathname == '/reg') {
        if(!username) {
            res.write('username is empty.');
            res.end();
        } else if(!password){
            res.write('password is empty.');
            res.end();
        } else {
            //check user existed
            db.query(`SELECT * FROM user_table WHERE username='${username}'`,(err,data)=>{
                if (err) {
                    res.write(JSON.stringify({code:1,msg:'database error'}));
                    res.end();
                } else if (data.length != 0) {
                    res.write(JSON.stringify({code:1,msg:'user existed'}));
                    res.end();
                } else {
                    db.query(`INSERT INTO user_table (username,password,online) VALUES ('${username}','${password}',0)`, (err,data)=> {
                       if (err) {
                           res.write(JSON.stringify({code:1,msg:'databse error'}));
                           res.end();
                       } else {
                           res.write(JSON.stringify({code:0,msg:'register success'}));
                           res.end();
                       }
                    });
                }
            })
        }

    } else if (pathname == '/login') {
        if(!username) {
            res.write('username is empty.');
            res.end();
        } else if(!password){
            res.write('password is empty.');
            res.end();
        } else {
            //check user existed
            db.query(`SELECT * FROM user_table WHERE username='${username}'`,(err,data)=>{
                if (err) {
                    res.write(JSON.stringify({code:1,msg:`db error`}));
                    res.end();
                } else if(data.length == 0){
                    res.write(JSON.stringify({code:1,msg:`user does't existed`}));
                    res.end();
                } else {
                    db.query(`UPDATE user_table SET online=1 WHERE username='${username}'`,(err,data)=>{
                        if (err) {
                            res.write(JSON.stringify({code:1,msg:`db error`}));
                            res.end();
                        } else {
                            res.write(JSON.stringify({code:0,msg:`login success`}));
                            res.end();
                        }
                    });
                }
            });
        }
    } else {
        fs.readFile(`www${pathname}`,(err,data) => {
            if (err) {
                res.writeHeader(404);
                res.write('not found');
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });
    }
});

httpServer.listen(8080);