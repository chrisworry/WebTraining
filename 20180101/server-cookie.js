const express = require('express');
const cookieParse = require('cookie-parser');

let server = express();
server.listen(8080);

server.use(cookieParse('asdasdeadsdeadasd'));

server.get('/', (req,res,next)=>{
    console.log('cookie:', req.cookies);
    console.log('signed cookie:', req.signedCookies);
    res.cookie('user','blue', {signed:true});
    //domain
    //expires:data
    //maxAge:int
    //path
    //secure:ture HTTPs
    //sign 签名
    res.write('cookie');
    res.end();

});