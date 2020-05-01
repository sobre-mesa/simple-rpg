let Character = require('./character');
const readline = require("readline");

const { DiceRoller } = require('rpg-dice-roller');

// const roll = new rpgDiceRoller.DiceRoll('2d6');
// console.log(roll);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let races = {
  "human": {
    name: "human",
    stats: {
      str: {
        addsValue: 0,
        addsGrowth: 1
      },
      agl: {
        addsValue: 0,
        addsGrowth: 1
      },
      int: {
        addsValue: 0,
        addsGrowth: 1
      },
      con: {
        addsValue: 0,
        addsGrowth: 1
      },
    }
  }
}

let jobs = {
  "warrior": {
    name: "warrior",
    stats: {
      str: {
        addsValue: 5,
        addsGrowth: 2
      },
      agl: {
        addsValue: 0,
        addsGrowth: 0
      },
      int: {
        addsValue: 0,
        addsGrowth: 0
      },
      con: {
        addsValue: 3,
        addsGrowth: 2
      },
    }
  }
}

let createNewCharacter = () => {
  let name;
  let race;
  let job;
  rl.question("Enter name: ", x => s2(x))
  const s2 = x => {
    name = x
    rl.question("Enter race: ", x => s3(x))
  }
  const s3 = x => {
    if (Object.keys(races).includes(x)) {
      race = races[x];
      rl.question("Enter class: ", x => finalStep(x))
    } else {
      rl.question("Enter race again: ", x => s3(x))
    }
  }
  const finalStep = x => {
    if (Object.keys(jobs).includes(x)) {
      job = jobs[x];
      let c = new Character({ name, race, job });
      c.describe();
      for(let i = 0; i <= 100; i++){
        c.gainXp(10);
      }
      menu("main-menu");
    } else {
      rl.question("Enter job again: ", x => finalStep(x))
    }
  }

}

let mainMenu = () => {
  console.log("Main menu: ")
  rl.question("Enter a command (enter 'help' for command list) :  ", x => menu(x))
}

const menuDefinition = {
  "exit": () => process.exit(),
  "main-menu": mainMenu,
  "create": createNewCharacter
}

function menu(option) {
  let menuOptions = Object.keys(menuDefinition);
  if (!menuOptions.includes(option)) {
    rl.question("Fugd up", x => menu(x));
  }
  else {
    menuDefinition[option]();
  }
}


menu("main-menu");