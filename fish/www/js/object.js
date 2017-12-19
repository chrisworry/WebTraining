class ImgWrapper {
    constructor(img, x, y, width, height) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(canvas, x, y, angle) {
        let ctx = canvas.getContext('2d');
        x -= this.width / 2;
        y -= this.height / 2;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.translate(-x, -y);
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
            x, y, this.width, this.height);
        ctx.restore();
    }
}

// class Button {
//     constructor()
// }

class Bottom {
    constructor(canvas) {
        this.canvas = canvas;
        this.imgWrapper = new ImgWrapper(resource.BOTTOM.img, 0, 0, resource.BOTTOM.img.width, 72);
    }
    draw() {
        let ctx = this.canvas.getContext('2d');
        this.imgWrapper.draw(this.canvas, this.canvas.width / 2 - 22, this.canvas.height - 68 / 2, 0);
    }
}

class Live {
    constructor(canvas, liveImgWrapperArray, deadImgWrapperArray, width, height) {
        //资源
        this.canvas = canvas;
        this.liveImgWrapperArray = liveImgWrapperArray;
        this.deadImgWrapperArray = deadImgWrapperArray;

        //运动的图片数（live or dead（死的动态图））
        this.liveFrame = liveImgWrapperArray.length;
        this.deadFrame = deadImgWrapperArray.length;
        this.updateTick = 10;
        this.tick = 0;
        this.curImgFrame = 0;

        //活/死 活着才能做碰撞
        this.live = true;
        //运动出canvas
        this.out = false;

        //运动状态
        const INITPOS = Util.queryPosition(canvas.width, canvas.height);
        this.width = width;
        this.height = height;
        this.radius = Math.sqrt((this.width * this.width) + (this.height * this.height));
        this.x = INITPOS.x; //x位置
        this.y = INITPOS.y; //y位置
        this.dx = INITPOS.dx; //运动方向（归一化）
        this.dy = INITPOS.dy; //运动方向（归一化）
        this.moveSpeed = Util.querySpeed(); //运动速度

        //暂时不考虑运动过程中的
        //累加到一个数后触发shake
        //this.shakeStatus = 0;
        //必须活着的时候才能被触发，到一定帧的时候触发变换方向活着速度,炮弹没有则为null
        //this.onShake = null;

        //事件
        this.onDead = null; //死的时候触发的事件：鱼加金币（伴随声音），炮则炸开产生网（伴随声音）

    }

    // setPositon(x,y) {
    //     if (this.live) {
    //         this.x = x;
    //         this.y = y
    //     }
    // }

    // setDirection(dx,dy) {
    //     if (this.live) {
    //         this.dx = dx;
    //         this.dy = dy;
    //     }
    // }

    checkOut() {
        if (this.x + this.radius < 0 ||
            this.x - this.radius > this.canvas.width ||
            this.y + this.radius < 0 ||
            this.y - this.radius > this.canvas.height) {
            this.out = true;
        }
    }

    draw() {
        if (this.live) {
            this.tick += 1;
            if (this.tick >= this.updateTick) {
                this.tick = 0;
                //change image frame
                this.curImgFrame++;
            }
            
            if (this.curImgFrame >= this.liveImgWrapperArray.length) {
                this.curImgFrame = 0;
            }
            //move 
            this.x += this.dx;
            this.y += this.dy;
            //calculate angle 
            let angle = Math.tan(this.dy, this.dx);
            this.liveImgWrapperArray[this.curImgFrame].draw(this.canvas, this.x, this.y, angle);
        } else{
            //dead logic
        }

        this.checkOut();
    }
}

class Fish extends Live {
    constructor(canvas, liveImgWrapperArray, deadImgWrapperArray, width, height, price) {
        super(canvas, liveImgWrapperArray, deadImgWrapperArray, width, height);
        this.price = price;
    }
}

// class Cannon {
//     constructor(canvas, imgUrl ,liveImgPosArray, deadImgPosAray, width, height) {
//         super(canvas, imgUrl ,liveImgPosArray, deadImgPosAray, width, height);
//         this.power = 0;
//         this.radius = 0;
//     }

//     setPower(power) {

//     }

//     setRadius(radius) {

//     }

//     hit(objs) {

//     }
// }

class FishFactory {
    constructor(resource, canvas) {
        this.resource = resource;
        this.canvas = canvas;

    }

    createFish(name) {
        for (let i = 0; i < this.resource.FISH.length; ++i) {
            let res = this.resource.FISH[i];
            if (res.name == name) {
                let width = res.img.width;
                let height = res.img.height;
                let lives = [];
                let deads = [];
                for (let j = 0; j < res.live; ++j) {
                    let imgWrapper = new ImgWrapper(res.img, 0, j * res.dH, width, res.dH);
                    lives.push(imgWrapper);
                }
                for (let j = 4; j < res.dead + 4; ++j) {
                    let imgWrapper = new ImgWrapper(res.img, 0, j * res.dH, width, res.dH);
                    deads.push(imgWrapper);
                }

                let fish = new Fish(this.canvas, lives, deads, width, res.dH, res.price);
                return fish;
            }
        }
        throw Error(`cant find fish ${name}.`);
    }

    createFishBatch(num) {
        let MAXFISH = 7;
        let fishes = [];
        for(let i=0; i<num; ++i) {
            let id = Math.floor((MAXFISH-1)*Math.random())+1;
            let name = `fish${id}`;
            fishes.push(this.createFish(name));
        }
        return fishes;        
    }

    createBullet(name) {
        switch (name) {

        }
    }
}