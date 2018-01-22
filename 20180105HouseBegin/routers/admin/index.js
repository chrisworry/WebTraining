const express = require('express');

let router = express.Router();
module.exports = router;


//进入所有admin相关的页面之前，都要校验用户身份，如果没登陆过（session），就去登陆（./admin/login）

//所有的(除了login)： use(各种方法); 没有路径（所有路径）; 放在中间件最前面
router.use((req, res, next)=>{
    if (!req.session['admin_ID'] && req.url != '/login') {//注意第二个条件（防止一直重定向，而且url不用加admin）
        res.redirect('/admin/login');//注意url需要写全了
        console.log('redirect admin login');
    }else {
        next();
    }
});

//展现login页面 GET
router.get('/login', (req,res)=>{
    res.send('admin login');
    res.end();
});

//提交了登陆请求 POST
router.post('/login', (req,res)=>{
    res.send('admin post login info');
    res.end();
});

router.get('/', (req,res)=>{
    res.send('admin');
    res.end();
});

