const fs = require('fs');
const zlib = require('zlib');
let gz = zlib.createGzip();

// let rs = fs.createReadStream('www/index.html');
// let ws = fs.createWriteStream('www/index_stream.html');

// rs.pipe(ws);
// rs.on('error' , err=>{
//     console.log('read falied.');
// });

// rs.on('end', ()=>{
//     console.log('read end.');
// });

// ws.on('error' , err=>{
//     console.log('write falied.');
// });

// ws.on('finish', ()=>{
//     console.log('write end.');
// });


let rs = fs.createReadStream('www/index.html');
let ws = fs.createWriteStream('www/index_stream.gz');
rs.pipe(gz).pipe(ws);

rs.on('error' , err=>{
    console.log('read falied.');
});

//注意read stream结束是finish
rs.on('end', ()=>{
    console.log('read end.');
});

ws.on('error' , err=>{
    console.log('write falied.');
});

//注意write stream结束是finish
ws.on('finish', ()=>{
    console.log('write end.');
});