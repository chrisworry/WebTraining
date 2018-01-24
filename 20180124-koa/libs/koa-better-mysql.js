const mysql = require('koa-mysql');

module.exports = {
    createPool(json) {
        const db = mysql.createPool(json);

        //存下旧的query函数(返回值是一个带callback的函数)
        let _query = db.query.bind(db);

        //替换query函数为返回Promise对象
        db.query = function(sql) {
            return new Promise((resolve, reject)=>{
                _query(sql)((err,data)=> {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            })
        };

        return db;
    }
}