class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.intervalId = null;
    this.tick = 0;
    this.fps = 60;
    this.background = new Background(this.ctx);
    this.newBack = new Floor(
      this.ctx,
      this.ctx.canvas.width,
      FLOOR,
      "/media/backgrounds/Parallax/5Floor.png",
      0,
      this.ctx.canvas.height - 55
    );
    this.marow = new Marow(this.ctx, 350, 285);
    this.enemies = [];

    this.endingTheGame = false;

    //SONIDOS

    this.gameOverAudio = new Audio("/media/Sonidos/gameover.m4a");
    this.gameOverAudio.volume = 0.5;
  }

  onKeyDown(event) {
    this.marow.onKeyDown(event);
  }

  onKeyUp(event) {
    this.marow.onKeyUp(event);
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.draw();
        this.checkCollisions();
        this.animate();
        this.move();
        this.addEnemy();
        this.clearEnemy();
      }, 1000 / this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  addEnemy() {
    this.tick++;
    // we add new enemy every 100 times we draw!
    if (this.tick > 250) {
      this.tick = 0;
      if (this.enemies.length < 3) {
        this.enemies.push(new Enemy(this.ctx));
        this.tick = 0;
      }
    }
  }

  checkCollisions() {
    const m = this.marow;

    this.enemies.forEach((e) => {
      const colx = m.x + (m.w - 40) >= e.x && m.x < e.x + (e.w - 40);
      const coly = m.y - 15 + m.h >= e.y && m.y < e.y + e.h;

      if (colx && coly) {
        this.gameOver();
      }
    });

    m.staff.spells.forEach((spell) => {
      this.enemies.forEach((enemy) => {
        spell.collisionBullet(enemy);
      });
    });
  }

  gameOver() {
    this.endingTheGame = true;
    this.marow.dead();
    setTimeout(() => {
      this.gameOverAudio.play();
      this.enemies = [];
      this.marow.x = 350;
      location.reload();
    }, 500);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.background.draw();
    this.newBack.draw();
    this.enemies.forEach((e) => e.draw(this.marow));
    this.marow.draw();
  }

  move() {
    if (!this.endingTheGame) {
      this.marow.move();
      this.enemies.forEach((e) => e.move(this.marow));
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  onKeyEvent(event) {
    const { type, keyCode } = event;
    switch (type) {
      case "keydown":
        this.marow.onKeyDown(keyCode);
        break;
      case "keyup":
        this.marow.onKeyUp(keyCode);
        break;
    }
  }

  animate() {
    this.marow.animate();
  }

  facing() {
    this.enemy.facing();
  }

  clearEnemy() {
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.isDead;
    });
  }
}
