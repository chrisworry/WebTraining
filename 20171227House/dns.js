const DNS = require('dns');
DNS.lookup('www.baidu.com', (err, data)=>{
    if (err) {
        console.log('error');
    } else {
        console.log(data);
    }
});

const ip = '111.206.223.206';
DNS.lookupService(ip, 80, (err,hostname, data)=>{
    if (err) {
        console.log('error');
    } else {
        console.log(data);
    }
});