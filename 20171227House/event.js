const Event = require('events').EventEmitter;
let ev = new Event();

//监听
ev.on('login', (a,b,c)=>{
    console.log(a, b, c);
});

//触发
let res = ev.emit('login', 12, 5 , 9);//返回值表示接收端有没有监听的事件
console.log(res);