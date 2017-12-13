class Shape {
    constructor(svg,type) {
        this._svg = svg;
        this._type = type;
        this._fillColor = 'rgba(255,0,0,1)';
        this._strokeColor = 'black';
        this._strokeWidth = 2;
        this._hitOn = false;
        this._down = false;
    }   
    
    toObj() {
        return null;
    }

    fillColor(color) {
        this._fillColor = color;
    }

    strokeColor(color) {
        this._strokeColor = color;
    }

    strokeWidth(width) {
        this._strokeWidth = width;
    }

    mouseDown(ev) {
        console.log('down');
    }

    mouseMove(ev) {
        console.log('move');
    }

    mouseUp(ev) {
        console.log('up');
    }

    hitOn() {
        this._hitOn = true;
    }

    hitClose() {
        this._hitOn = false;
    }

    hit(x,y) {

    }

    clearHit() {
        this._hitOn = false;
        this._down = false;
    }
}

class Path extends Shape {
    constructor(svg) {
        super(svg,'path');
        this._data = [];
        this._dataCache = [];
        this._close = false;
        this._path = document.createElementNS("http://www.w3.org/2000/svg",'path');
        this._path.addEventListener('mousedown',(function(ev){this.mouseDown(ev);}).bind(this), false);
        this._path.addEventListener('mousemove',(function(ev){this.mouseMove(ev);}).bind(this), false);
        this._path.addEventListener('mouseup',(function(ev){this.mouseUp(ev);}).bind(this), false);
    }

    close(flag) {
        this._close = flag;
    }

    toObj() {
        if (this._data.length < 4) {
            return null;
        }

        let d = '';
        d = `M ${this._data[0]},${this._data[1]} L `;
        for (let i=2;i<this._data.length;++i) {
            d += `${this._data[i]} `;
        }

        //默认的SVG的path和canvas的不一样，是闭合的，取消闭合只能fill一个完全透明的背景，而且结尾不要封闭（不设置Z）
        if (this._close) {
            d+='Z';
            this._path.style.fill = this._fillColor;
        } else {    
            this._path.style.fill = 'rgba(0,0,0,0)';
        }
        
        this._path.setAttribute('d',d);
        this._path.style.stroke = this._strokeColor;
        this._path.style.strokeWidth = this._strokeWidth;
        
        return this._path;
    }

    push(x,y) {
        this._data.push(x);
        this._data.push(y);
    }

    mouseDown(ev) {
        if (!this._hitOn) {
            return;
        }
        const x = ev.offsetX;
        const y = ev.offsetY;
        this._down = true;
        this._dataCache = [];
        for (let i=0; i<this._data.length/2; ++i) {
            this._dataCache.push(x - this._data[i*2]);
            this._dataCache.push(y - this._data[i*2+1]);
        }
    }

    mouseMove(ev) {
        if (!this._hitOn || !this._down) {
            return;
        }
        const x = ev.offsetX;
        const y = ev.offsetY;
        this._data = [];
        for (let i=0; i<this._dataCache.length/2; ++i) {
            this._data.push(x - this._dataCache[i*2]);
            this._data.push(y - this._dataCache[i*2+1]);
        }
    }

    mouseUp(ev) {
        if (!this._hitOn || !this._down) {
            return;
        }
        this._down = false;
    }
}

class SVGContainer {
    constructor(svg) {
        this._shapes = [];
        this._svg = svg;
    }

    push(shape) {
        this._shapes.push(shape);
    }

    rear() {
        if (this._shapes.length == 0){
            return null;
        } else {
            return this._shapes[this._shapes.length-1];
        }
    }

    clean() {
        while(this._svg.hasChildNodes()){
            this._svg.removeChild(this._svg.firstChild);
        }
        this._shapes = [];
    }

    update() {
        while(this._svg.hasChildNodes()){
            this._svg.removeChild(this._svg.firstChild);
        }

        this._shapes.forEach(ele=> {
            let obj = ele.toObj();
            if (obj) {
                this._svg.appendChild(obj);
            }
        });
    }    

    hitOn() {
        this._shapes.forEach(ele=> {
            ele.hitOn();
        });
    }

    hitClose() {
        this._shapes.forEach(ele=> {
            ele.hitClose();
        });
    }
}
