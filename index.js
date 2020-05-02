let { createNewCharacter } = require('./character');
let Enemy = require('./enemy');
const readline = require("readline");

const cryingOrc = new Enemy("orc");

class Game {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.character = {};
    this.menuDefinition = {
      "exit": () => process.exit(),
      "main-menu": this.mainMenu,
      "create": () => {
         createNewCharacter(this.rl, this.menu, this.character)
      },
      "attack": () => this.character.attack(this.rl,cryingOrc)
    }
  }

  mainMenu = () => {
    this.rl.question("Enter a command (enter 'help' for command list) :  ", x => { console.log("callback", x); return this.menu(x) })
  }

  menu(option) {
    console.log("menu ", option)
    let menuOptions = Object.keys(this.menuDefinition);
    if (!menuOptions.includes(option)) {
      console.log("Not a valid command");
      this.menu("main-menu");
    }
    else {
      this.menuDefinition[option]();
    }
  }
}

let game = new Game();
game.menu("main-menu");
