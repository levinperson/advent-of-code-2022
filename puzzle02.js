const fs = require("fs");

const files = fs.readFileSync("./puzzle02-input.txt", "utf8"); //Read the input

const arr = files.replace(/\r/g, "").trim().split("\n"); //remove all carriage returns and split by single line return

const arrSplited = arr.map((x) => {
  return x.split(" "); //split the two Letters by space (" ")
});

//Part 1
//Store the score for each round in the resultArray array.
const resultArray = arrSplited.map((x) => {
  let count = 0;
  if (x[1] === "X") {
    count = 1;
  } else if (x[1] === "Y") {
    count = 2;
  } else if (x[1] === "Z") {
    count = 3;
  }

  if (
    (x[0] === "A" && x[1] === "Y") ||
    (x[0] === "B" && x[1] === "Z") ||
    (x[0] === "C" && x[1] === "X")
  ) {
    count += 6;
  } else if (
    (x[0] === "A" && x[1] === "X") ||
    (x[0] === "B" && x[1] === "Y") ||
    (x[0] === "C" && x[1] === "Z")
  ) {
    count += 3;
  }
  return count;
});

//Part 1 solution. Get the total score:
const totalScore = resultArray.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
console.log(totalScore);

//Part 2. Need to modify the resultArray based on the new rules
const resultArray2 = arrSplited.map((x) => {
  let count = 0;
  if (x[1] === "X") {
    count = 0;
  } else if (x[1] === "Y") {
    count = 3;
  } else if (x[1] === "Z") {
    count = 6;
  }

  if (
    (x[0] === "A" && x[1] === "Y") ||
    (x[0] === "B" && x[1] === "X") ||
    (x[0] === "C" && x[1] === "Z")
  ) {
    count += 1;
  } else if (
    (x[0] === "A" && x[1] === "Z") ||
    (x[0] === "B" && x[1] === "Y") ||
    (x[0] === "C" && x[1] === "X")
  ) {
    count += 2;
  } else {
    count += 3;
  }
  return count;
});
//Part 2 solution. Get the total score:
const totalScore2 = resultArray2.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
console.log(totalScore2);
