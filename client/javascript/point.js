export class Point {
    constructor() {
        this.turno = 0;
        this.src = []
        this.src.push(new img("f1.jpeg", 900, 450, 0, 0, 200, 200));
        this.src.push(new img("f2.jpg", 900, 450, 0, 0, 200, 200));
        this.src.push(new img("f3.jpg", 900, 450, 0, 0, 200, 200));
        this.src.push(new img("f4.jpg", 900, 450, 0, 0, 200, 200));
        this.src.push(new img("f5.jpeg", 900, 450, 0, 0, 200, 200));
        this.src.push(new img("f6.jpg", 900, 450, 0, 0, 200, 200));
        this.src.push(new img("f7.jpg", 900, 450, 0, 0, 200, 200));
        this.src.push(new img("f8.jpg", 900, 450, 0, 0, 200, 200));
        // this.src = [["f1.jpeg", "face"], ["f2.jpg", "face"], ["f3.jpg", "Chair"], ["f4.jpg", "face"], ["f5.jpeg", "face"], ["f6.jpg", "face"], ["f7.jpg", "face"], ["f8.jpg", "face"]];
        this.length = this.src.length
    }

    setPoint() {
        this.turno = this.turno + 1;
    }
}

class img {
    constructor(src, width, height, x, y, w, h) {
        this.src = src;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
}