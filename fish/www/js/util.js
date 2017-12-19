class Util {
    // static queryPosition(width ,height) {
    
    //     let dx = Math.random();
    //     let dy = Math.random();
    //     let dd = Math.sqrt(dx*dx + dy*dy);
    //     dx /= dd;
    //     dy /= dd;
    //     let x,y;
    //     if(dx>=0) {
    //         x = Math.random()*width;
    //     } else {
    //         x = width - Math.random()*width;
    //     }
    //     if (dy>=0) {
    //         y = Math.random()*height;
    //     } else {
    //         y = height - Math.random()*height;
    //     }

    //     return {x:x,y:y,dx:dx,dy:dy};
    // }

    //有错，也许是rotate角度写错了
    static queryPosition(width ,height) {
        //           0        
        //   |--------------|   //
        // 3 |              | 1 //
        //   |              |   //
        //   |--------------|   //
        //           2
        //choose a border
        let sign = Math.random() > 0.5 ? 1:-1;
        let dx = Math.random();
        let dy = Math.random();
        let dd = Math.sqrt(dx*dx + dy*dy);
        dx /= dd;
        dy /= dd;
        let x = Math.random()*width;
        let y = Math.random()*height;

        let border = Math.floor(Math.random()*4);
        border = 0;
        if (border == 0) {
            y = 0;
            dx *= sign;
            dy *= 1;
        } else if (border == 1) {
            x = width;
            dx *= -1;
            dy *= sign;
        } else if (border == 2) {
            y = height;
            dx *= sign;
            dy *= -1;
        } else if (border == 3) {
            x = 0;
            dx*= 1;
            dy*=sign;
        }
        return {x:x,y:y,dx:dx,dy:dy};
    }

    static querySpeed() {
        return Math.random()*2;
    }
}