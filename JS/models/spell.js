class Spell {
    constructor(ctx, x, y, characterFacingRight) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.vx = 10;
      this.vy = 0;
      this.ax = 0;
      this.ay = 0.02;
      this.r = 3;

      this.img = new Image()
      this.img.src = "/media/Marow/6/SPELL1.png"

      this.img.onload = () => {
        this.img.isReady = true;
        
      }

      this.characterFacingRight = characterFacingRight;
      this.activeOrNot = false
    }
  
    draw() {
      this.ctx.beginPath();
      if (this.img.isReady) {
      this.ctx.drawImage(this.img, this.x - this.r, this.y - this.r, this.r * 8, this.r * 8);
      this.ctx.closePath();
    }
  }
  
    move() {
      this.vx = this.characterFacingRight ?  10 : -10;
      this.vx += this.ax;
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.ay;

      if (this.x < 0 || this.y < 0 || this.x > this.ctx.canvas.width || this.y > this.ctx.canvas.height) { 
        this.activeOrNot = true
      }
    }

    
    collisionBullet(enemy) {
      if (
        this.x < enemy.x + enemy.w &&
        this.x + this.r > enemy.x &&
        this.y < enemy.y + enemy.h &&
        this.y + this.r > enemy.y
      ) {   
         enemy.enemyKilled()
         this.activeOrNot = true
      }
    }
  }

  