
const http = require('http');
const url = require('url');
const queryString = require('querystring');

// let str = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=de%27a&rsv_pq=ebc68eb70006915f&rsv_t=aaccIozYopTA%2BI0wku7aYu046IL1yowI6s8MGXJ3F8O4bDfH%2Fzk5Zhk%2FCno&rqlang=cn&rsv_enter=0';
// let obj = url.parse(str,true);
// console.log(obj);


// let server = http.createServer((req,res)=>{
//     let {pathname, query}  =url.parse(req.url, true);

//     //POST urlencode
//     // console.log(pathname, query);
//     // let aBuffer = [];
//     // req.on('data', data=>{
//     //     aBuffer.push(data);
//     // });

//     // req.on('end', ()=>{
//     //     let data = Buffer.concat(aBuffer);
//     //     let str = data.toString();
//     //     let post = queryString.parse(str);
//     //     console.log(post);

//     // });

//     //POST formdata
    

// });

// server.listen(8080);


//common function
// Buffer.prototype.splice = Buffer.prototype.splice || function(str) {
//     let buf = this;
//     let aBuf = [];
//     while(buf.length) {
//         let i = buf.indexOf(str);
//         if (i == -1) {
//             aBuf.push(buf);
//             break;
//         } else {
//             let sub = buf.slice(0,i);
//             if (sub.length != 0) {
//                 aBuf.push(sub);
//             }
//             //console.log(buf.slice(0,i).toString());
//             buf = buf.slice(i+str.length);
//             //console.log(buf.toString());
//         }
//     }
//     return aBuf;
// }

let aaa = new Buffer('asdadeda=adead==adeadasd=asd');
// let i = aaa.indexOf('=');
// let bbb = aaa.slice(0,i);
// aaa = aaa.slice(i+1);
// console.log(aaa.toString());
// console.log(bbb.toString());

require('./buffer.js');

let bbb = aaa.splice('=');
bbb.forEach(ele=>{
    console.log(ele.toString());
})

// function splice(buf, str) {
//     let aBuf = [];
//     while(buf.length) {
//         let i = buf.indexOf(str);
//         if (i == -1) {
//             aBuf.push(buf);
//             break;
//         } else {
//             let sub = buf.slice(0,i);
//             if (sub.length != 0) {
//                 aBuf.push(sub);
//             }
//             //console.log(buf.slice(0,i).toString());
//             buf = buf.slice(i+1);
//             //console.log(buf.toString());
//         }
//     }
//     return aBuf;
// }

// let bbb = splice(aaa, '=');
// bbb.forEach(ele=>{
//     console.log(ele.toString());
// })

