class StatSet {
  constructor(job, race) {
    //Initial values
    this.str = new Stat(5);
    this.agl = new Stat(5);
    this.int = new Stat(5);
    this.con = new Stat(5);
    this.jobModifiers(job);
    this.raceModifiers(race);
  }

  jobModifiers(job) {
    this.str.applyModifier(job.stats.str);
    this.agl.applyModifier(job.stats.agl);
    this.int.applyModifier(job.stats.int);
    this.con.applyModifier(job.stats.con);
  }

  raceModifiers(race) {
    this.str.applyModifier(race.stats.str);
    this.agl.applyModifier(race.stats.agl);
    this.int.applyModifier(race.stats.int);
    this.con.applyModifier(race.stats.con);
  }

  levelUp() {
    this.str.grow();
    this.agl.grow();
    this.int.grow();
    this.con.grow();
    console.log("Your chars stats are now: ")
    this.describe();
  }

  describe(){
    let prn = ({str, agl, int, con}) => {
      console.log("STR: ", str)
      console.log("AGL: ", agl)
      console.log("INT: ", int)
      console.log("CON: ", con)
    }
   prn(this.statMap())
  }

  statMap(){
    return {
      str: this.str.val(), 
      agl: this.agl.val(),
      int: this.int.val(),
      con: this.con.val(),
    }
  }
}

class Stat {
  constructor(stat) {
    this.value = stat;
    this.growth = 1; //How much is added per level
  }

  applyModifier(stat) {
    this.value = this.value + stat.addsValue;
    this.growth = this.growth + stat.addsGrowth;
  }

  grow() {
    this.value = this.value + this.growth;
  }

  val(){
    return this.value;
  }

}

module.exports = StatSet;