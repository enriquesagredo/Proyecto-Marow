class Staff {
    constructor(ctx, x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
  
      this.spells = []
      this.lastShoot = 0
    }

    shoot(characterFacingRight) {
      const time = Date.now();
      if (time - this.lastShoot >= 750){
      const newSpell = new Spell(this.ctx, this.x, this.y, characterFacingRight);
      this.spells.push(newSpell);
      this.lastShoot = time;
    }
    }
    draw() {
      this.spells.forEach((spell) => {
        spell.draw();
      });
      // console.log(this.spells);
      this.spells = this.spells.filter((s) => !s.activeOrNot)
      };
    
  
    move() {
      this.spells.forEach((spell) => {
        spell.move();
      });
    }

    filterSpells(spell) {
      this.spells.forEach((spell, i) => {    
        if (!spells.isActive) {
          this.spells.splice(i, 1);
        }
      });
    }
  }