const fs = require('fs');
fs.stat('./note.txt', (err,stat)=>{
    if (err) {
        console.log('文件不存在');
    } else {
        console.log(stat);
    }
});