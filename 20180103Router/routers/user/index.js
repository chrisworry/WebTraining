const express = require('express');

let router_user = express.Router();

router_user.get('/', (req,res)=>{
    res.send('user');
    res.end();
});

router_user.get('/login', (req,res)=>{
    res.send('login');
    res.end();
});

router_user.get('/reg', (req,res)=>{
    res.send('reg');
    res.end();
});

router_user.use('/vip', require('./vip'));

module.exports = router_user;