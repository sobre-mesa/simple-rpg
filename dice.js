let roll = (sides) => Math.floor(Math.random() * sides) + 1;

let calc = (times, sides, coll) => {
  coll.push(roll(sides));
  return times == 0 ? coll : calc(times - 1, sides, coll);
}

let dice = (diceString) => {
  let [times, sides] = diceString.split("d");
  let res = calc(times - 1, sides, []);
  let added = res.reduce((x, y) => x + y, 0);
  return [added, times * sides];
}

let diceSuccess = (diceString) => {
  let result = dice(diceString);
  return result[0] / result[1] * 100;
}

module.exports = diceSuccess;
