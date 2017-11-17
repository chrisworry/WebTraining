const http = require('http');
const io = require('socket.io');
const mysql = require('mysql');
const fs = require('fs');
const url = require('url');

let httpServer = http.createServer((req, res) => {
    let pathname = url.parse(req.url, true).pathname;
    fs.readFile(`www${pathname}`, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('not found');
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});

let db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: '20171113'
});

httpServer.listen(8080);

let onlineUsers = [];

let wsServer = io.listen(httpServer);
wsServer.on('connection', socket => {
    let curUsername = ''
    socket.on('disconnect', () => {
        if (curUsername == '') {
            return;
        }

        let tmp = [];
        for (let i=0; i<onlineUsers.length; ++i) {
            if (onlineUsers[i] != curUsername) {
                tmp.push(onlineUsers[i]);       
            }
        }
        onlineUsers = tmp;

        db.query(`UPDATE user_table SET online=0 WHERE username='${curUsername}'`, (err, res) => {
            if (err) {
                console.log('error');
            } else {
                console.log('byby');
            }
        });     
    });

    socket.on('login', (username, password) => {
        if (!username) {
            socket.emit('login_ret', 1, 'username is empty.');
        } else if (!password) {
            socket.emit('login_ret', 1, 'password is empty.');
        } else {
            db.query(`SELECT * FROM user_table WHERE username='${username}'`, (err, res) => {
                if (err) {
                    socket.emit('login_ret', 1, `db error`);
                } else if (res.length == 0) {
                    socket.emit('login_ret', 1, `user name doesn't existed`);
                } else {
                    if (res[0].password != password) {
                        socket.emit('login_ret', 1, `password wrong`);
                    } else {
                        //update online status
                        db.query(`UPDATE user_table SET online=1 WHERE username='${username}'`, (err, res) => {
                            if (err) {
                                onlineUsers.push(username);
                                socket.emit('login_ret', 1, 'db update online error');
                            } else {
                                curUsername = username;
                                socket.emit('login_ret', 0, `login success`);
                            }
                        });
                    }
                }
            });
        }
    });

    socket.on('reg', (username, password) => {
        if (!username) {
            socket.emit('reg_ret', 1, 'username is empty.');
        } else if (!password) {
            socket.emit('reg_ret', 1, 'password is empty.');
        } else {
            db.query(`SELECT * FROM user_table WHERE username='${username}'`,(err,res)=>{
                if (err) {
                    socket.emit('reg_ret', 1, 'db error');
                } else if(res.length != 0) {
                    socket.emit('reg_ret', 1, 'usernmae has existed');
                } else {
                    db.query(`INSERT INTO user_table (username, password, online) VALUES ('${username}','${password}',0)`, (err,res)=>{
                        if (err) {
                            socket.emit('reg_ret', 1, 'db insert error');
                        } else {
                            socket.emit('reg_ret', 0, 'register success');
                        }
                    });
                }
            });
        }
    });
});