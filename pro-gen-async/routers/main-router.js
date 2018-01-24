const express = require('express');

let router = express.Router();

module.exports = router;

router.get('/', (req,res)=>{
    res.render('index', {Status:''});
});

//--------------------------//
// AJAX
//--------------------------//
router.route('/login2')
.get((req,res)=>{
    const {user, pass} = req.query;

    //Cookie 判断
    //查询通过req.cookies属性
    //设置通过res.cookie方法
    //console.log(req.cookies);
    // if (!req.cookies['user']) {
    //     res.cookie('user', user);
        
    // }

    //Session 判断
    console.log('cookie: ', req.cookies);
    console.log('session: ', req.session);
    if (!req.session.user) {
        req.session.user = user;

        console.log('cookie  222 : ', req.cookies);
    }    

    res.send({err:0, msg:`welcome ${user}`});
})
.post((req,res)=>{
    const {user, pass} = req.body;
    //console.log(user, pass);
    res.send({err:0, msg:`welcome ${user}`});
});

///关于Multer 
//fieldname就是form中file input的name
//即 <input type="file" name="my-fieldname">
//用single则req.file中拿信息
//用array fields any则从req.files中拿信息
router.post('/file2',global.upload.single('file'), (req,res)=>{
    console.log(req.file);
    res.send({err:0, msg:`load ${req.file.originalname} success`})
});