const fs = require("fs");

const files = fs.readFileSync("./puzzle10-input.txt", "utf8"); //Read the input

const arr = files.replace(/\r/g, "").trim().split("\n"); //remove all carriage returns and split by single line return

//add 0 next to noop to make things easier to manipulate
const arrWithZero = arr.map((x) => {
  if (x === "noop") {
    return "noop 0";
  } else {
    return x;
  }
});

const splitedArr = arrWithZero.map((x) => x.split(" "));
const splitedArrNum = splitedArr.map((x) => {
  return [x[0], parseInt(x[1])];
});

const cycleObj = {
  cycle: [0],
  registerX: [1],
};

for (let i = 0; i < splitedArrNum.length; i++) {
  if (i === 0) {
    if (splitedArrNum[i][0] === "noop") {
      cycleObj.cycle.push(cycleObj.cycle.length);
      cycleObj.registerX.push(
        cycleObj.registerX[cycleObj.registerX.length - 1]
      );
    } else if (splitedArrNum[i][0] === "addx") {
      cycleObj.cycle.push(cycleObj.cycle.length, cycleObj.cycle.length + 1);
      cycleObj.registerX.push(
        cycleObj.registerX[cycleObj.registerX.length - 1],
        cycleObj.registerX[cycleObj.registerX.length - 1]
      );
    }
  } else if (i > 0) {
    if (splitedArrNum[i][0] === "noop") {
      cycleObj.cycle.push(cycleObj.cycle.length);
      cycleObj.registerX.push(
        cycleObj.registerX[cycleObj.registerX.length - 1] +
          splitedArrNum[i - 1][1]
      );
    } else if (splitedArrNum[i][0] === "addx") {
      cycleObj.cycle.push(cycleObj.cycle.length, cycleObj.cycle.length + 1);
      cycleObj.registerX.push(
        cycleObj.registerX[cycleObj.registerX.length - 1] +
          splitedArrNum[i - 1][1],
        cycleObj.registerX[cycleObj.registerX.length - 1] +
          splitedArrNum[i - 1][1]
      );
    }
  }
}
//Part 1: calculate the sum with cycles: 20; 60; 100; 140; 180; 220
let sum = 0;
for (let i = 20; i <= 220; i += 40) {
  sum += i * cycleObj.registerX[i];
}
console.log(sum);

//Part 2:
const output = [];

function drawing(position, register) {
  if (position <= register + 1 && position >= register - 1) {
    output.push("#");
  } else {
    output.push(".");
  }
}

for (let i = 1; i < cycleObj.cycle.length; i++) {
  if (i >= 1 && i <= 40) {
    const pos = cycleObj.cycle[i] - 1;
    drawing(pos, cycleObj.registerX[i]);
  } else if (i >= 41 && i <= 80) {
    const pos = cycleObj.cycle[i] - 1 - 40;
    drawing(pos, cycleObj.registerX[i]);
  } else if (i >= 81 && i <= 120) {
    const pos = cycleObj.cycle[i] - 1 - 80;
    drawing(pos, cycleObj.registerX[i]);
  } else if (i >= 121 && i <= 160) {
    const pos = cycleObj.cycle[i] - 1 - 120;
    drawing(pos, cycleObj.registerX[i]);
  } else if (i >= 161 && i <= 200) {
    const pos = cycleObj.cycle[i] - 1 - 160;
    drawing(pos, cycleObj.registerX[i]);
  } else if (i >= 201 && i <= 240) {
    const pos = cycleObj.cycle[i] - 1 - 200;
    drawing(pos, cycleObj.registerX[i]);
  }
}
outputJoined = output.join("");
// Split the string into lines of 40 characters or less
const lines = outputJoined.match(/.{1,40}/g);
console.log(lines);
// First clear the output file puzzle10-output.txt's contents by using the 'w' flag
fs.writeFileSync("./puzzle10-output.txt", "", { flag: "w" });
//Then write each line to the output file puzzle10-output.txt
lines.forEach((line) => {
  fs.writeFileSync("./puzzle10-output.txt", line + "\n", { flag: "a" });
});
