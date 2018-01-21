const http = require('http');
const Event = require('events').EventEmitter;

module.exports = class {
    constructor() {
        this.__ev = new Event();

        this.__server = http.createServer((req, res) => {
            const _this = this;
            if (this.__queue.length > 0) {
                //构造ctx
                const ctx = {
                    req: req,
                    res: res,

                }
                _run(0);

                async function _run(n) {
                    const fn = _this.__queue[n];

                    if (str.indexOf('AsyncFunction') != -1) {
                        fn(ctx, function () {
                            return new Promise (resolve, reject)=>{
                                _run(n + 1);
                            };
                        );
                        

                }
        });

        this.__queue = [];
    }

    listen(port = 80) {
        this.__server.listen(port);
    }

    use(fn) {
        const str = fn.constructor.toString();
        //console.log(str);
        if (str.indexOf('GeneratorFunction') != -1) {
            console.warn('koa的generator函数已经弃用了');
        }

        this.__queue.push(fn);


        // if (str.indexOf('GeneratorFunction') != -1) {
        //     console.log('generator 函数');
        // } else if (str.indexOf('AsyncFunction') != -1) {
        //     console.log('async 函数');
        // } else if (str.indexOf('Function') != -1) {
        //     console.log('普通函数');
        // }
    }
};