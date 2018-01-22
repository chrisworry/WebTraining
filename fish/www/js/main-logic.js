class MainLogic {
    constructor(resource,canvas) {
        this.resource = resource;
        this.canvas = canvas;
        this.fishFactory = new FishFactory(resource,canvas);
        this.background = [];
        this.lives = [];
        this.livesLimitUpper = 30;
        this.livesLimitLower = 20;
    }

    init() {
        // let obj = new ImgWrapper(resource.FISH[0].img,
        //     0, 0, resource.FISH[0].img.width, resource.FISH[0].dH);
        // this.lives.push(obj);
        let bottom = new Bottom(this.canvas);

        this.background.push(bottom);
        this.lives = this.fishFactory.createFishBatch(this.livesLimitUpper);
    }

    updateLives() {
        //add fish
        if (this.lives.length < this.livesLimitLower) {
            let addLimit = this.livesLimitUpper - this.lives.length;
            let addCount = Math.floor((Math.random()*addLimit));
            let addLives = this.fishFactory.createFishBatch(addCount);
            addLives.forEach(ele => {
                this.lives.push(ele);
            });
        }



    }

    play() {
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.lives.forEach(ele=>{
            ele.draw();
        });

        this.background.forEach(ele=>{
            ele.draw();
        });
    

        let tmp = this.lives;
        this.lives = [];
        tmp.forEach(ele=>{
            if(!ele.out) {
                this.lives.push(ele);
            }else {
                console.log('out');
            }
        });

        this.updateLives();
        
    }

    run() {
        this.init();

        setInterval((function(){
            this.play();
        }).bind(this),20);

    }

    logic() {

    }
}