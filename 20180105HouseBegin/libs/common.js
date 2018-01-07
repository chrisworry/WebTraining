const crypto = require('crypto');

module.exports = {
    md5(str) {
        let hash =crypto.createHash();
        hash.update(str);
        return hash.digest();
    }
}