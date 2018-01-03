const express = require('express');

let router_vip = express.Router();

router_vip.get('/' ,(req,res)=>{
    res.send('VIP');
    res.end();
});

module.exports = router_vip;