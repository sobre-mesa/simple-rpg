let diceSuccess = require('./dice');

class Enemy {
  constructor(type) {
    this.type = type;
    this.health = 100;
    this.attackLogic = enemyLogic[type];
    this.attacks = enemyAttacks[type];
  }

  defend(attack) {
    let crit = diceSuccess(attack.critChance) > 50;
    let damage = crit ? attack.dmg * (attack.critMultiplier || 2) : attack.dmg;
    this.health = this.health - damage;
    console.log("The ", this.type, "receives ", damage, " damage.");
    console.log(this.health, "HP Remaining")
  }

  attack(character) {
    let attack = this.attackLogic(character);
    character.defend(attack);
  }
}

let enemyLogic = {
  "orc": (character) => {
    if (character.health < 20) {
      return enemyAttacks["Execute"]
    }
    else {
      return enemyAttacks["Slash"]
    }
  }
}

let enemyAttacks = {
  "orc": {
    "Slash": { dmg: 10, critChance: "3d6" },
    "Execute": { dmg: 5, critChance: "1d6", critMultiplier: 3 }
  }
}

module.exports = Enemy;