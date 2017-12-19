
class Resource {
    constructor() {
        this.FISH = [
            {name:'fish1', url:'img/fish1.png', price:10, dH:37, live:4, dead:4, img:null},
            {name:'fish2', url:'img/fish2.png', price:20, dH:64, live:4, dead:4, img:null},
            {name:'fish3', url:'img/fish3.png', price:30, dH:56, live:4, dead:4, img:null},
            {name:'fish4', url:'img/fish4.png', price:40, dH:59, live:4, dead:4, img:null},
            {name:'fish5', url:'img/fish5.png', price:50, dH:122, live:4, dead:4, img:null},
            {name:'fish6', url:'img/shark1.png', price:100, dH:270, live:8, dead:4, img:null},
            {name:'fish7', url:'img/shark2.png', price:100, dH:273, live:8, dead:4, img:null},
        ];

        this.CANNON = [
            {name:'cannon1', url:'img/cannon1.png', power:10, dH:74, img:null},
            {name:'cannon2', url:'img/cannon2.png', power:20, dH:76, img:null},
            {name:'cannon3', url:'img/cannon3.png', power:30, dH:76, img:null},
            {name:'cannon4', url:'img/cannon4.png', power:10, dH:83, img:null},
            {name:'cannon5', url:'img/cannon5.png', power:40, dH:85, img:null},
            {name:'cannon6', url:'img/cannon6.png', power:50, dH:90, img:null},
            {name:'cannon7', url:'img/cannon7.png', power:60, dH:94, img:null},
        ];

        this.BOTTOM = {name:'bottom', url:'img/bottom.png', img:null};
        

        this.error = 0;
        this.loaded = 0;
        this.errorInfo = '';
    }

    load(cb) {
        //clear
        this.error = 0;
        this.loaded = 0;
        this.errorInfo = '';

        let res = [];
        this.FISH.forEach(ele=> {
            res.push(ele);
        });
        this.CANNON.forEach(ele=> {
            res.push(ele);
        });
        res.push(this.BOTTOM);

        res.forEach(ele => {
            ele.img = new Image();
            ele.img.onerror = (function() {
                this.error += 1;
                this.errorInfo += `${ele.url} load failed.`;
                if (this.loaded + this.error == res.length){
                    cb(this.errorInfo);
                }
            }).bind(this);
            ele.img.onload = (function() {
                this.loaded +=1;
                if (this.loaded == res.length) {
                    cb(null);
                } else if (this.loaded + this.error == res.length){
                    cb(this.errorInfo);
                }
            }).bind(this);
            ele.img.src = ele.url;
        });
    }
}

let resource = new Resource();