const fs = require('fs');

module.exports = function (root) {
    return async(ctx)=>{
    //不能直接写fs的回调，需要用promise
    ctx.response.body = await new Promise((resolve, reject)=>{
        fs.readFile(`${root}${ctx.request.path}`, (err,data)=>{
            if (err) {
                // ctx.res.writeHead(404);
                // ctx.res.write('not found!!!');
                // ctx.res.end();
                reject(err);
            } else {
                resolve(data.toString());//这里需要配置
            } 
        });
    });
}
}