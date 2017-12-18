class Obj {
    constructor(canvas, imgUrl ,liveImgPosArray, deadImgPosAray, width, height) {
        //资源
        this.canvas = canvas;
        this.imgUrl = imgUrl;
        this.liveImgPosArray  =liveImgPosArray;
        this.deadImgPosAray = deadImgPosAray;
        this.width = width;
        this.height = height;

        //运动的图片数（live or dead（死的动态图））
        this.liveFrame = liveImgPosArray.length;
        this.deadFrame = deadImgPosAray.length;

        //状态 
        this.x;//x位置
        this.y;//y位置
        this.live;//活/死 活着才能做碰撞
        this.moveDir = {x:1,y:0};//运动方向（归一化）
        this.moveSpeed = 1;//运动速度
        this.shakeStatus = 0;//累加到一个数后触发shake

        //事件
        this.onDead = null;//死的时候触发的事件：鱼加金币（伴随声音），炮则炸开产生网（伴随声音）
        this.onShake = null;//必须活着的时候才能被触发，到一定帧的时候触发变换方向活着速度,炮弹没有则为null

        
    }

    setPositon(x,y) {
        
    }

    draw() {
        
    }
}

class Resource {
    constructor() {
        this.fishImg = [];
    }

    getFishImg(name) {
        //return canvas's Image
    }
}


class Fish extends Obj {
    constructor(canvas, imgUrl ,liveImgPosArray, deadImgPosAray, width, height) {
        super(canvas, imgUrl ,liveImgPosArray, deadImgPosAray, width, height);
        this.price = 0;
    }

    setPrice(price) {
        this.price = price;
    }
}

class Cannon {
    constructor(canvas, imgUrl ,liveImgPosArray, deadImgPosAray, width, height) {
        super(canvas, imgUrl ,liveImgPosArray, deadImgPosAray, width, height);
        this.power = 0;
        this.radius = 0;
    }

    setPower(power) {

    }

    setRadius(radius) {

    }

    hit(objs) {
        
    }
}

class FishFactory {
    constructor() {

    }

    createFish(name) {
        switch(name) {

        }
    }

    createBullet(name) {
        switch(name) {

        }
    }
}