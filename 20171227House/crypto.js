const crypto = require('crypto');

let hash = crypto.createHash('md5');

hash.update('absdef');
hash.update('ioio');

console.log(hash.digest('hex'));