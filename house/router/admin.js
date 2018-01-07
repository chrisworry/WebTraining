const express = require('express');

let router = express.Router();
module.exports = router;

router.get('/', (req,res)=>{
    //通过session检查登陆状态
    res.render('admin_index');
    res.end();
});

router.get('/login', (req,res)=>{
    res.render('admin_login');
    res.end();    
});

router.post('/login', (req,res)=> {
    console.log(req.body);
    const {username, password} = req.body;
    
    res.send('admin post login info');
    res.end();
});