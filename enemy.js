import { DiceRoller } from 'rpg-dice-roller';

class Enemy {
  constructor(name, type) {
    this.name = name;
    this.health = 100;
    this.attackLogic = enemyLogic[type];
    this.attacks = enemyAttacks[type];
  }

  nextAttack(character) {
    character.defend(this.attackLogic(character))
  }
}

let enemyLogic = {
  "orc": (character) => {
    if (character.health < 20) {
      return enemyAttacks["Execute"]
    }
    else{
      return enemyAttacks["Slash"]
    }
  }
}

let enemyAttacks = {
  "orc": {
    "Slash": { dmg: 10 },
    "Execute": { dmg: 20 }
  }
}
