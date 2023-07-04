class Marow {
    constructor(ctx, x, y){
    this.ctx = ctx,

    this.y0 = y;


    this.x = x;
    this.y = y;
    this.w = Math.floor(312 / 4);
    this.h = 89;
    this.vx = 0;
    this.vy = 0;
    this.ay = 1;
    this.ax = 0;
 
    this.tick = 0
    
    //variables booleanas
    this.characterFacingRight = true
    this.characterRun = true
    this.moving = null
    
    this.staff = new Staff(this.ctx, this.x + this.w, this.y + this.h / 2);

    // Idle izq y derecha
    this.img = new Image()
    this.img.src = this.characterFacingRight ? "/media/Marow/6/IDLE1D.png" : "/media/Marow/6/IDLE1.png";
    this.mirrorimg =  new Image()
    this.mirrorimg.src = "/media/Marow/6/IDLE1D.png" 
    this.img.frames = 3;
    this.img.frameIndex = 0;


    // Run
    this.runimg = new Image()
    this.runimg.src = "/media/Marow/6/todo.png"
    this.spriteWidth = 30
    this.spriteHeight = 30
    this.spriteX = 0
    this.spriteY = 0
    this.currentFrame = 0
    this.totalFrames = 1
    this.framesPerRow = 20
    this.animationSpeed = 10

    

    this.img.onload = () => {
        this.img.isReady = true;
        this.img.frameWidth = 312 / 4;
        this.img.frameHeight = this.img.height;
        
      }
  
}
    move() {    
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;

        this.staff.x = this.x + (this.w /2)
        this.staff.y = this.y + (this.h /4)
        this.staff.move()

        if (this.x < 0) {
          this.x = 0;
        } else if (this.x + this.w > this.ctx.canvas.width) {
          this.x = this.ctx.canvas.width - this.w;
        }

       if (this.y > this.y0) {
        this.y = this.y0;
        this.vy = 0;
      }
    }


    draw() {
        if (this.img.isReady) {
          this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.frameWidth,
            0,
            this.img.frameWidth,
            this.img.frameHeight,
            this.x,
            this.y,
            this.w,
            this.h,
          );


          
          if (DEBUG) {
            Utils.drawDebugRect(this.ctx, this.x, this.y, this.w, this.h)

        }
        this.animate()

           if (this.characterRun = true) {
          this.spriteX = ((this.currentFrame % this.framesPerRow) * this.spriteWidth)
          this.spriteY = this.spriteHeight;
        }
       
     
        }
        this.staff.draw()
    }

    onKeyDown(keyCode) {
          switch (keyCode) {
            case KEY_UP:
              this.jump();
              break;
            case KEY_LEFT:
              this.vx = -MAROWSPEED;
              this.characterFacingRight = false
              this.img.src = this.characterFacingRight ? "/media/Marow/6/IDLE1D.png" : "/media/Marow/6/IDLE1.png";
              break;
            case KEY_RIGHT:
              this.vx = MAROWSPEED;
              this.characterFacingRight = true
              this.img.src = this.characterFacingRight ? "/media/Marow/6/IDLE1D.png" : "/media/Marow/6/IDLE1.png";
              break;
            case KEY_SPACE:
              this.staff.shoot(this.characterFacingRight);
              break;
          }
      }
    
      onKeyUp(keyCode) {
        switch (keyCode) {
          case KEY_LEFT:
          case KEY_RIGHT:
            this.vx = 0;
            break;        }
      }

      jump() {
        if (!this.isJumping()) {
          this.vy = -23;
        }
        
      }
    
      isJumping() {
        return this.y < this.y0;
      }

      animate(){

        this.tick++
        if(this.tick > 18) {
          this.tick = 0;
          this.img.frameIndex++
          if(this.img.frameIndex > this.img.frames) {
            this.img.frameIndex = 0;
          }
        }

      }
}