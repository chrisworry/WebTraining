const express = require('express');
const sessionParse = require('cookie-session');

let server = express();
server.listen(8080);

server.use(sessionParse({
    secret:'dasdgageasdf'
}));

server.get('/', (req,res,next)=>{

    console.log(req.session);

    req.session['cache'] = 1000;
    if(req.session['count']) {
        req.session['count']++;
    } else {
        req.session['count'] = 1;
    }
    res.end();
});