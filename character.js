let StatSet = require('./stats');
let rl = require('./readline');

class Character {
  constructor(attributes) {
    this.name = attributes.name;
    this.race = attributes.race.name;
    this.job = attributes.job.name;
    this.lvl = 1;
    this.xp = 0;
    this.stats = new StatSet(attributes.job, attributes.race);
    this.health = 100;
    this.attacks = attributes.job.attacks;
  }

  defend(attack) {
    let crit = diceSuccess(attack.critChance) > 50;
    let damage = crit ? attack * (attack.critMultiplier || 2) : attack;
    this.health = this.health - damage;
    console.log(name, "receives ", damage, " damage.");
    console.log(this.health, "HP Remaining")
  }

  gainXp(gain) {
    this.xp = this.xp + gain;
    let needed = this.xpNeeded();
    if (this.xp >= needed) {
      this.levelUp();
    }
  }

  levelUp() {
    this.xp = 0;
    this.lvl = this.lvl + 1;
    console.log("DING!!!! XP to next level:", this.xpNeeded())
    this.stats.levelUp();
  }

  xpNeeded() {
    let a = Math.pow(2, this.lvl)
    return Math.floor(100 * (a - 1))
  }

  describe() {
    console.log("This is: " + this.name + ", a lvl " + this.lvl + " " + this.race + " " + this.job);
    console.log("His current stats are :")
    this.stats.describe()
  }

  attack(enemy) {
    let possibleAttacks = Object.keys(this.attacks);
    let question = () => rl.question("Choose an attack: " + possibleAttacks, x => getAttack(x));
    let getAttack = x => {
      if (possibleAttacks.includes(x)) {
        console.log(possibleAttacks);
        finalStep(this.attacks[x]);
      }
      else{
        question();
      }
    }
    let finalStep = attack => {
      console.log(attack)
      enemy.defend(attack);
    }
    question();
  }
}


module.exports = Character;