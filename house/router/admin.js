const express = require('express');
const common = require('../libs/common');

let router = express.Router();
module.exports = router;

router.use((req,res, next)=>{
    console.log(req.url);

    if (!req.session['admin_ID'] && req.url != '/login') {
        res.redirect('/admin/login');
    } else {
        next();
    }
});

router.get('/', (req,res)=>{
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
    
    //tmp code
    if (username == 'wr' && password == '123456') {
        req.session['admin_ID'] = 'wr';
        //success
        res.redirect('/admin/');
    } else {
        res.render('admin_login', {error_msg: 'login failed'});
        res.end();
    }
});