const os = require('os');

//CPU
//console.log(os.cpus());

//内存
console.log(os.freemem());//windows下估不准

//系统负载
console.log(os.loadavg());//windows下永远是0 0 0
