Buffer.prototype.splice = Buffer.prototype.splice || function(str) {
    let buf = this;
    let aBuf = [];
    while(buf.length) {
        let i = buf.indexOf(str);
        if (i == -1) {
            aBuf.push(buf);
            break;
        } else {
            let sub = buf.slice(0,i);
            if (sub.length != 0) {
                aBuf.push(sub);
            }
            //console.log(buf.slice(0,i).toString());
            buf = buf.slice(i+str.length);
            //console.log(buf.toString());
        }
    }
    return aBuf;
}