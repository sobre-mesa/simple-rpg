let jobs = {
  "warrior": {
    name: "warrior",
    attacks: {
      "Slash": { dmg: 10, critChance: "3d6" },
      "Execute": { dmg: 5, critChance: "1d6", critMultiplier: 3 }
    },
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

module.exports = jobs;