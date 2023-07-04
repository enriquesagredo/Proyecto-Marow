class Background {
    constructor(ctx, imageRoute = "/media/backgrounds/Parallax/5Floor.png", x = 0, y = 0) {
        this.ctx = ctx;
        this.w = this.ctx.canvas.width
        this.h = this.ctx.canvas.height
        this.x = x
        this.y = y

        this.img = new Image()
        this.img.src = "/media/backgrounds/FantasyForest/2.png"
        this.img.onload = () => {
            this.img.isReady = true;
          };
    }

    draw() {
        if (this.img.isReady) {
          this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        }
    }
    
}//1625game.js:18 Uncaught TypeError: Cannot read properties of undefined (reading 'draw')
//at Game.draw (game.js:18:29)
//at game.js:13:18