const fs = require("fs");

const files = fs.readFileSync("./puzzle05-input.txt", "utf8"); //Read the input

const arr = files.replace(/\r/g, ""); //remove all carriage returns and split by single line return

const [stacks, moves] = arr.split("\n\n");

const splitedStacks = stacks.split("\n");

splitedStacks.pop(); //remove the numbers below the stacks
const splitedStacksWithE = splitedStacks.map((x) => {
  return x
    .replace(/\s{4}/g, "e")
    .replace(/\s|\[|\]/g, "") //replace the empty space on each stack with the lowercase letter e.
    .split(""); //split each row into an array
});

//re-construct the stacks array into an object:
const reconstructedStacks = {};
for (let j = splitedStacksWithE.length - 1; j >= 0; j--) {
  for (let i = 0; i < splitedStacksWithE[0].length; i++) {
    k = i + 1;
    if (!reconstructedStacks[k]) {
      reconstructedStacks[k] = []; // initialize as empty array if not exist yet
    }
    if (splitedStacksWithE[j][i] !== "e") {
      reconstructedStacks[k].push(splitedStacksWithE[j][i]);
    }
  }
}
//use the JSON method to create a deep copy of the reconstructedStacks object as the partII input
const reconstructedStacks2 = JSON.parse(JSON.stringify(reconstructedStacks));

const reconstructedMoves = moves.split("\n").map((x) =>
  x
    .replace(/move |from|to/g, "")
    .split(/\s+/)
    .map(Number)
);
//The below function gets the final result based on the final reconstructedStacks
function getTopCrates(yourFinalStacks) {
  let topCrates = "";
  for (let i = 1; i <= Object.keys(yourFinalStacks).length; i++) {
    topCrates += yourFinalStacks[i][yourFinalStacks[i].length - 1];
  }
  console.log(topCrates);
}

function partI() {
  for (let move of reconstructedMoves) {
    for (let i = 1; i <= move[0]; i++) {
      reconstructedStacks[move[2]].push(
        reconstructedStacks[move[1]][reconstructedStacks[move[1]].length - 1]
      );
      reconstructedStacks[move[1]].pop();
    }
  }

  getTopCrates(reconstructedStacks);
}

function partII() {
  for (let move of reconstructedMoves) {
    temp = [];
    for (let i = 1; i <= move[0]; i++) {
      temp.unshift(
        reconstructedStacks2[move[1]][reconstructedStacks2[move[1]].length - 1]
      );
      reconstructedStacks2[move[1]].pop();
    }
    reconstructedStacks2[move[2]] = reconstructedStacks2[move[2]].concat(temp);
  }

  getTopCrates(reconstructedStacks2);
}

partI();
partII();
