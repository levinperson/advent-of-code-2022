const fs = require("fs");

const files = fs.readFileSync("./puzzle11-input.txt", "utf8"); //Read the input

const arr = files.replace(/\r/g, "").trim().split("\n\n"); //remove all carriage returns and split by single line return

const monkeys = arr.map((x) => {
  const temp = x.split("\n");
  temp.shift();
  return temp;
});

const monkeysNoWords = monkeys.map((item) => {
  return item.map((x) => x.replace(/[^0-9+*]/g, " ").trim()); //remove everyting except for digits, + and *
});
//Create the Monkeys' object:
function monkeysObjInitialization() {
  let monkeysObj = {};
  for (let i = 0; i < monkeysNoWords.length; i++) {
    monkeysObj[i] = {
      items: monkeysNoWords[i][0].split(/\s+/).map(Number),
      operation: {
        operator: monkeysNoWords[i][1].split(/\s+/)[0],
        number: parseInt(monkeysNoWords[i][1].split(/\s+/)[1]),
      },
      test: parseInt(monkeysNoWords[i][2]),
      ifTrue: parseInt(monkeysNoWords[i][3]),
      ifFalse: parseInt(monkeysNoWords[i][4]),
      timesCount: 0,
    };
  }
  return monkeysObj;
}

let monkeysObjPartI = monkeysObjInitialization();
let monkeysObjPartII = monkeysObjInitialization();

//This variable is for Part2's worry level management calculation
let divisible = 1;
for (let monkey = 0; monkey < Object.keys(monkeysObjPartII).length; monkey++) {
  divisible *= monkeysObjPartII[monkey].test;
}

function worryManagement(part1OrPart2, number, div = 1) {
  if (part1OrPart2 === "part1") {
    number = Math.floor(number / 3);
  } else if (part1OrPart2 === "part2") {
    number = number % div;
  }
  return number;
}

function monkeyBusiness(obj) {
  let timesOfCount = [];
  for (let monkey = 0; monkey < Object.keys(obj).length; monkey++) {
    timesOfCount.push(obj[monkey].timesCount);
    timesOfCount.sort((a, b) => b - a);
  }
  const monkeyBusiness = timesOfCount[0] * timesOfCount[1];
  return monkeyBusiness;
}

function eachRound(whichPart, monkeysObj) {
  for (let monkey = 0; monkey < Object.keys(monkeysObj).length; monkey++) {
    for (let item = 0; item < monkeysObj[monkey].items.length; item++) {
      if (
        monkeysObj[monkey].operation.operator === "+" &&
        isNaN(monkeysObj[monkey].operation.number)
      ) {
        monkeysObj[monkey].items[item] += monkeysObj[monkey].items[item];
      } else if (
        monkeysObj[monkey].operation.operator === "+" &&
        monkeysObj[monkey].operation.number !== NaN
      ) {
        monkeysObj[monkey].items[item] += monkeysObj[monkey].operation.number;
      } else if (
        monkeysObj[monkey].operation.operator === "*" &&
        isNaN(monkeysObj[monkey].operation.number)
      ) {
        monkeysObj[monkey].items[item] *= monkeysObj[monkey].items[item];
      } else if (
        monkeysObj[monkey].operation.operator === "*" &&
        monkeysObj[monkey].operation.number !== NaN
      ) {
        monkeysObj[monkey].items[item] *= monkeysObj[monkey].operation.number;
      }

      monkeysObj[monkey].items[item] = worryManagement(
        whichPart,
        monkeysObj[monkey].items[item],
        divisible
      );

      if (monkeysObj[monkey].items[item] % monkeysObj[monkey].test === 0) {
        monkeysObj[monkeysObj[monkey].ifTrue].items.push(
          monkeysObj[monkey].items[item]
        );
      } else {
        monkeysObj[monkeysObj[monkey].ifFalse].items.push(
          monkeysObj[monkey].items[item]
        );
      }
      monkeysObj[monkey].timesCount++;
    }
    monkeysObj[monkey].items = [];
  }
}

//For Part 1, the process takes 20 rounds
for (let i = 1; i <= 20; i++) {
  eachRound("part1", monkeysObjPartI);
}
//For Part 1, to calculate the monkey business:
const resultPartI = monkeyBusiness(monkeysObjPartI);

//For Part 2, the process takes 10000 rounds
for (let i = 1; i <= 10000; i++) {
  eachRound("part2", monkeysObjPartII);
}
//For Part 2, to calculate the monkey business:
const resultPartII = monkeyBusiness(monkeysObjPartII);

console.log(resultPartI);
console.log(resultPartII);
