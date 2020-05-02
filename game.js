let races = require('./races');
let jobs = require('./jobs');
let Character = require('./character');
let Enemy = require('./enemy');
let rl = require('./readline');
const cryingOrc = new Enemy("orc");

class Game {
  constructor() {
    this.rl = rl;
    this.character = {};
    this.menuDefinition = {
      "exit": () => process.exit(),
      "main-menu": this.mainMenu,
      "create": () => {
        this.createNewCharacter()
      },
      "attack": () => this.character.attack(cryingOrc),
      "preset": () => {
        this.character = new Character({ name: "Morathis", race: races["human"], job: jobs["warrior"] });
        this.character.describe();
        this.mainMenu();
      },
    }
  }

  mainMenu = () => {
    this.rl.question("Enter a command (enter 'help' for command list) :  ", x => this.menu(x))
  }

  menu(option) {
    let menuOptions = Object.keys(this.menuDefinition);
    if (!menuOptions.includes(option)) {
      console.log("Not a valid command");
      this.menu("main-menu");
    }
    else {
      this.menuDefinition[option]();
    }
  }

  createNewCharacter = () => {
    let name;
    let race;
    let job;
    this.rl.question("Enter name: ", x => s2(x))
    const s2 = x => {
      name = x
      this.rl.question("Enter race: ", x => s3(x))
    }
    const s3 = x => {
      if (Object.keys(races).includes(x)) {
        race = races[x];
        this.rl.question("Enter class: ", x => finalStep(x))
      } else {
        this.rl.question("Enter race again: ", x => s3(x))
      }
    }
    const finalStep = x => {
      if (Object.keys(jobs).includes(x)) {
        job = jobs[x];
        this.character = new Character({ name, race, job });
        console.log("Character created!: ")
        this.character.describe();
        this.menu("main-menu");
      } else {
        this.rl.question("Enter job again: ", x => finalStep(x))
      }
    }
  }
}

module.exports = Game;