const express = require('express');

let router = express.Router();

module.exports = router;

router.get('/', (req,res)=>{
    res.render('index', {Status:''});
});

//--------------------------//
// FORM
//--------------------------//
router.route('/login')
.get((req,res)=>{
    const {user, pass} = req.query;
    console.log(user, pass);
    res.render('index', {Status:`welcome ${user}`});
})
.post((req,res)=>{
    const {user, pass} = req.body;
    console.log(user, pass);
    res.render('index', {Status:`welcome ${user}`});
});

///关于Multer 
//fieldname就是form中file input的name
//即 <input type="file" name="my-fieldname">
//用single则req.file中拿信息
//用array fields any则从req.files中拿信息
router.post('/file',global.upload.single('file'), (req,res)=>{
    console.log(req.file);
    res.render('index', {Status:`load file ${req.file.originalname} success`});
});



//--------------------------//
// AJAX
//--------------------------//
router.route('/login2')
.get((req,res)=>{
    const {user, pass} = req.query;
    console.log(user, pass);
    res.send({err:0, msg:`welcome ${user}`});
})
.post((req,res)=>{
    const {user, pass} = req.body;
    console.log(user, pass);
    res.send({err:0, msg:`welcome ${user}`});
});


router.post('/file2',global.upload.single('file'), (req,res)=>{
    console.log(req.file);
    res.send({err:0, msg:`load ${req.file.originalname} success`})
});