const crypto = require('crypto');

module.exports = {
    md5(str) {
        let md5 = crypto.createHash('md5');
        md5.update(str);
        return md5.digest('hex');  
    },
}