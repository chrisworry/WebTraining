const fs = require('fs');

module.exports = function(req,res,next) {
    let arr = [];
    // IP
    let ip = req.connection;
    // time
    let oData = new Date();
    let t = oData.toGMTString();
    // method
    let method = req.method;
    // url
    let url = req.url;

    arr.push('[' + ip + ']');
    arr.push('[' + t + ']');
    arr.push('[' + method + ']');
    arr.push('[' + url + ']');
    arr.push('\n');
    fs.appendFile('./log.txt', arr.join(' '),(err, data)=>{
        if (err) {
            console.log('log failed.', err);
        }
    });

    next();
}