class Floor {
    constructor(ctx, w, h, imageRoute = "/media/backgrounds/Parallax/5Floor.png", x = 0, y = 0) {
        this.ctx = ctx;
        this.w = w
        this.h = h
        this.x = x
        this.y = y

        this.img = new Image()
        this.img.src = imageRoute
        this.img.onload = () => {
            this.img.isReady = true;
          };
    } 

    draw() {
        if (this.img.isReady) {
          this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        }
    }
    
}