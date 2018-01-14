const express = require('express');
const config = require('../configure/config');
const common = require('../lib/common');

let router = express.Router();
module.exports = router;

const SESSION_ADMIN = 'admin_id';
const ITEMS_PRE_PAGE = 10;

//-------------------------------------------//
//common function

//-------------------------------------------//


//-------------------------------------------//
//登陆状态记录：cookie-session
//-------------------------------------------//
router.use((req, res, next) => {
    if (!req.session[SESSION_ADMIN] && req.url != '/login') {
        res.redirect('/admin/login');
    } else {
        next();
    }
});

//-------------------------------------------//
//页面
//-------------------------------------------//
router.get('/login', (req, res) => {
    res.render('admin_login');
});

router.get('/', (req, res) => {
    res.redirect('/admin/house'); //默认第一次进入显示house表
});

//-------------------------------------------//
//接口
//-------------------------------------------//

//登陆
router.post('/login', (req, res) => {
    //console.log(req.body);
    const {
        username,
        password
    } = req.body;
    //超级管理员
    if (username == config.adminName && common.md5(password) == config.adminPassword) {
        req.session[SESSION_ADMIN] = '1';
        res.redirect('/admin/');
    } else {
        //普通管理员
        req.db.query(`SELECT * from admin_table WHERE username='${username}'`, (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                res.end();
            } else {
                //用户不存在
                if (data.length == 0) {
                    res.redirect('/admin/login');
                } else if (data[0].password != common.md5(password)) {
                    res.redirect('/admin/login');
                } else {
                    req.session[SESSION_ADMIN] = data.ID;
                    res.redirect('/admin/');
                }
            }
        });
    }
});

//索引
router.get('/:table', (req, res) => {
    const {table} = req.params;
    //索引数据库当前页码的数据
    let cur_page = 1;
    let sum_page = 1;
    if (req.query['cur_page']) {
        cur_page = parseInt(req.query['cur_page']);
    }
    let table_curpage_list = [];

    //前台要显示的条目
    let show_list = config[`show_in_${table}_table`];
    if (!show_list) {
        res.send(404);
        res.end();
    }

    show_list = show_list.split(',');
    let query_list = [];
    let title_list = [];
    show_list.forEach(ele => {
        let tmp = ele.split(':');
        query_list.push(tmp[0]);
        title_list.push(tmp[1]);
    });
    query_list = query_list.join(',');

    //获取每个条目
    req.db.query(`SELECT ${query_list} FROM ${table}_table`, (err, data_list) => {
        if (err) {
            res.sendStatus(500);
        } else {
            //获取页码
            // AS count 是别名
            req.db.query(`SELECT COUNT(*) AS count from ${table}_table`, (err, count) => {
                if (err) {
                    res.sendStatus(500);
                } else {
                    sum_page = Math.ceil(count[0].count / ITEMS_PRE_PAGE);
                    res.render('admin_index' , {table: table, sum_page:sum_page, title_list: title_list, data_list:data_list});
                }
            });
        }
    });
});

//添加修改
router.post('/:table', (req,res)=>{
    const {table} = req.params;
    //修改
    if(req.body.is_mod && req.body.is_mod == 'true') {
        let update_List = [];
        let updateID = req.body['old_id'];
        if (!updateID) {
            res.sendStatus(404);
        }

        for (attr in req.body) {
            if (attr != 'is_mod' && attr != 'old_id' && attr != 'ID' && req.body[attr]) {
                update_List.push(attr + "='" + req.body[attr] + "'");
            }
        }
        update_List = update_List.join(',')
        let sql = `UPDATE ${table}_table SET ${update_List} WHERE ID='${updateID}'`;
        req.db.query(sql, (err)=>{
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.redirect(`/admin/${table}`);
            }
        });
    }
    //添加
    else{
        let query_list = [];
        let value_list = [];
        for (attr in req.body) {
            if (attr != 'is_mod' && attr != 'old_id' && req.body[attr]) {
                query_list.push(attr);
                value_list.push(req.body[attr]);    
            }
        }
        query_list = 'ID,admin_id,'+query_list.join(',');
        value_list = "'" + common.uuid() + "','" + req.session[SESSION_ADMIN] + "','"+value_list.join("','")+"'";
        let sql = `INSERT INTO ${table}_table (${query_list}) VALUES (${value_list})`;
        req.db.query(sql, (err)=>{
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.redirect(`/admin/${table}`);
            }
        });
    }

});

//修改项目获取数据
router.post('/:table/get_data', (req,res)=>{
    const {table} = req.params;
    const {id} = req.body;
    req.db.query(`SELECT * FROM ${table}_table WHERE ID='${id}'`, (err,data)=>{
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else if(data.length == 0) {
            res.sendStatus(404);
        } else {
            res.send(data[0]);
            res.end();
        }
    })
    console.log(id);
});