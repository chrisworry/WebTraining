const router = require('./router');

let users = {};

router.on('/login', (req, res)=>{
    let {user, pass} = req.query;
    console.log('login', user, req);
    if (!users[user]) {
        res.send({code:1, msg:'user is existed.'});
    } else if (users[user] != pass) {
        res.send({code:1, msg:'pass error.'});
    } else {
        res.send({code:0, msg:'login success'});
    }
    res.end()
});

router.on('/reg', (req, res)=>{
    let {user, pass} = req.query;
    console.log('reg', user, req);
    if (users[user]) {
        res.send({code:1, msg:'user existed.'});
    } else {
        users[user] = pass;
        res.send({code:0, msg:'reg success'});
    }
    res.end()
});
