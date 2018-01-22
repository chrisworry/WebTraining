const cluster = require('cluster');
const os = require('os');
const process = require('process');

if(cluster.isMaster) {
    //console.log(os.cpus());
    for(let i=0; i<os.cpus().length; ++i) {
        cluster.fork();
    }
    console.log('主进程启动了', process.pid);
} else {
    console.log('子进程启动了', process.pid);
}


