let StatSet = require('./stats');
class Character{

  constructor(attributes){
    this.name = attributes.name;
    this.race = attributes.race.name;
    this.job = attributes.job.name;
    this.lvl = 1;
    this.xp = 0;
    this.stats = new StatSet(attributes.job, attributes.race);
    this.health = 100;
  }
   gainXp(gain){
    this.xp = this.xp + gain;
    let needed = this.xpNeeded();
    if(this.xp >= needed){
      this.levelUp();
    }
  }

  levelUp(){
    this.xp = 0;
    this.lvl = this.lvl + 1;
    console.log("DING!!!! XP to next level:", this.xpNeeded())
    this.stats.levelUp();
  }

  xpNeeded(){
    let a = Math.pow(2, this.lvl)
    return Math.floor(100 * (a - 1))
  }

  describe(){
    console.log("This is: " + this.name + ", a lvl " + this.lvl + " " +  this.race + " " + this.job);
    console.log("His current stats are :")
    this.stats.describe()
  }
}

module.exports = Character;