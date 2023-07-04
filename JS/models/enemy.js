class Enemy {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = Math.random() > 0.5 ? 900 : -100;
    this.y = 300;
    this.w = 80;
    this.h = 70;
    this.vx = -3;

    //this.facingright = this.x === 900;

    this.img = new Image();
    //this.img.src = this.facingright ? "/media/Enemigos/BlackMageNM/idle.png" : "/media/Enemigos/BlackMageNM/idleD.png";
    this.img.verticalFrames = 3;
    this.img.verticalFrameIndex = 0;
    this.img.horizontalFrames = 3;
    this.img.horizontalFrameIndex = 0;

    this.img.onload = () => {
      this.img.isReady = true;

      this.img.frameWidth = Math.floor(
        this.img.width / this.img.horizontalFrames
      );

      this.img.frameHeight = Math.floor(
        this.img.height / this.img.verticalFrames
      );
    };


    this.isDead = false
    //VARIABLES BOOLEANAS
    // this.enemyFacingRight = true

    this.animationTick = 0;
  }

  draw(marow) {
    this.img.src = marow.x < this.x ? "/media/Enemigos/BlackMageNM/idle.png" : "/media/Enemigos/BlackMageNM/idleD.png";
    if (this.img.isReady) {
      this.ctx.drawImage(
        this.img,
        this.img.horizontalFrameIndex * this.img.frameWidth,
        this.img.verticalFrameIndex * this.img.frameHeight,
        this.img.frameWidth,
        this.img.frameHeight,
        this.x,
        this.y,
        this.w,
        this.h
      );

      this.animate();
    }
  }

  move(marow) {
    marow.x > this.x ? (this.x += ENEMYVX) : (this.x -= ENEMYVX);
  }

  animate() {
    this.animationTick++;

    if (this.animationTick > 10) {
      this.animationTick = 0;
      this.img.horizontalFrameIndex++;

      if (this.img.horizontalFrameIndex > this.img.horizontalFrames - 1) {
        this.img.horizontalFrameIndex = 0;
      }
    }
  }


  enemyKilled() {
    this.isDead = !this.isDead
  }

}
