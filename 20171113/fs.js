const fs = require('fs');
fs.readFile('1.txt', function(err,data) {
    if(err) {
        console.log('err');
    } else {
        console.log(data.toString());
    }
});
fs.writeFile('2.txt','ahdejd',function(err){
    if(err) {
        console.log(err);
    }
});