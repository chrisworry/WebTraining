const express = require('express');

let router_article = express.Router();

router_article.get('/', (req,res)=>{
    res.send('article');
    res.end();
});

module.exports = router_article;