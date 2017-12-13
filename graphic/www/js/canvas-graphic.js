class Shape {
    constructor(canvas, type) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this._type = type;
        this._fillColor = 'rgba(255,0,0,0.5)';
        this._strokeColor = 'black';
        this._strokeWidth = 2;
        this._highLight = false;
        this._highLightColor = 'rgba(255,0,0,1)';
        this._disX =0;
        this._disY =0;
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

    draw() {

    }
    hit(x, y) {
        return false;
    }
    move(x,y) {

    }
    highLight(flag) {
        this._highLight = flag;
    }
};

class Path extends Shape {
    constructor(canvas) {
        super(canvas, 'path');
        this.data = [];
        this._closePath = false;
    }

    clear() {
        this.data = [];
    }

    push(x, y) {
        this.data.push(x);
        this.data.push(y);
    }

    pop(x, y) {

    }

    closePath(flag) {
        this._closePath = flag;
    }

    draw() {
        if (this.data.length < 4) {
            return;
        }

        //fill
        if (this._closePath && this._fillColor != 'rgba(0,0,0,0)') {
            this.ctx.beginPath();
            this.ctx.moveTo(this.data[0], this.data[1]);
            for (let i = 0; i < this.data.length - 2; i += 2) {
                this.ctx.lineTo(this.data[i], this.data[i + 1]);
            }
            this.ctx.closePath();
            this.ctx.fillStyle = this._fillColor;
            this.ctx.fill();
        }

        //stroke
        this.ctx.beginPath();
        this.ctx.moveTo(this.data[0], this.data[1]);
        for (let i = 0; i < this.data.length - 2; i += 2) {
            this.ctx.lineTo(this.data[i], this.data[i + 1]);
        }
        this.ctx.strokeStyle = this._strokeColor;
        this.ctx.lineWidth = this._strokeWidth;
        if (this._closePath) {
            this.ctx.closePath();
        }
        this.ctx.stroke();

    }
};

class Rect extends Shape {
    constructor(canvas) {
        super(canvas, 'rect')
        this._x = 0;
        this._y = 0;
        this._w = 0;
        this._h = 0;
    }

    setRect(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._w = width;
        this._h = height;
    }

    setXY(x, y) {
        this._x = x;
        this._y = y;
    }

    setSize(width, height) {
        this._w = width;
        this._h = height;
    }

    setRectFill() {

    }

    draw() {

        //fill
        this.ctx.beginPath();
        const x = this._x;
        const y = this._y;
        const w = this._w;
        const h = this._h;
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + w, y);
        this.ctx.lineTo(x + w, y + h);
        this.ctx.lineTo(x, y + h);
        this.ctx.closePath();
        this.ctx.fillStyle = this._fillColor;
        this.ctx.fill();

        //stroke
        this.ctx.strokeStyle = this._highLight ? this._highLightColor : this._strokeColor;
        this.ctx.lineWidth = this._strokeWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + w, y);
        this.ctx.lineTo(x + w, y + h);
        this.ctx.lineTo(x, y + h);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    hit(x, y) {
        if (x >= this._x && x <= this._x + this._w &&
            y >= this._y && y <= this._y + this._h) {
            this._disX = x-this._x;
            this._disY = y-this._y;
            return true;
        } else {
            return false;
        }
    }
    move(x,y) {
        if (this._highLight) {
            this._x = x - this._disX;
            this._y = y - this._disY; 
        }
    }
};

class Circle extends Shape {
    constructor(canvas) {
        super(canvas, 'circle');
        this._cx = 0;
        this._cy = 0;
        this._r = 0;
    }

    setCenter(x, y) {
        this._cx = x;
        this._cy = y;
    }

    setRadius(r) {
        this._r = r;
    }

    draw() {
        if (this._fillColor != 'rgba(0,0,0,0)') {
            this.ctx.fillStyle = this._fillColor;
            this.ctx.beginPath();
            this.ctx.arc(this._cx, this._cy, this._r, 0, 2.0 * Math.PI, true);
            this.ctx.closePath();
            this.ctx.fill();

        }

        this.ctx.strokeStyle = this._highLight ? this._highLightColor : this._strokeColor;
        this.ctx.lineWidth = this._strokeWidth;
        this.ctx.beginPath();
        this.ctx.arc(this._cx, this._cy, this._r, 0, 2.0 * Math.PI, true);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    hit(x, y) {
        const dis = Math.sqrt((x-this._cx)*(x-this._cx) + (y-this._cy)*(y-this._cy));
        if (dis <= this._r) {
            this._disX = x-this._cx;
            this._disY = y-this._cy;
            return true;
        } else {
            return false;
        }
    }

    move(x,y) {
        if (this._highLight) {
            this._cx = x - this._disX;
            this._cy = y - this._disY; 
        }
    }
};

class ShapeContainer {
    constructor(canvas) {
        this.canvas = canvas;
        this.shapes = [];
    }

    push(shape) {
        this.shapes.push(shape);
    }

    pop() {
        return this.shapes.pop();
    }

    clear() {
        this.shapes = [];
    }

    rear() {
        if (this.shapes.length == 0) {
            return null;
        } else {
            return this.shapes[this.shapes.length - 1];
        }
    }

    render(clearCanvas = true) {
        if (clearCanvas) {
            this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.shapes.forEach(ele => {
            ele.draw();
        });
    }

    hit(x,y) {
        this.clearHit();
        for (let i=this.shapes.length-1; i>=0; --i) {
            if (this.shapes[i].hit(x,y)) {
                this.shapes[i].highLight(true);
                return this.shapes[i];
            }
        }
        return null;
    }

    clearHit() {
        this.shapes.forEach(ele=>{
            ele.highLight(false);
        });
    }

    move(x,y) {
        this.shapes.forEach(ele=>{
            ele.move(x,y);
        });
    }
};

function histogram(data) {
    let hist = [];
    for (let i=0; i<255; ++i) {
        hist.push(0);
    }

    for (let i=0; i<data.length/4; ++i) {
        hist[data[i*4]] +=1;
    }

    return hist;
}